//! Minimal, dependency-free C ABI over the canonical Hemant Rust core.
//!
//! Workers pass the `Date.now()` millisecond clock as signed i128 halves and
//! supply an output buffer allocated through this module. The API deliberately
//! reports the Worker clock as unverified with unknown uncertainty.

use core::slice;
use hemant_core::{registry_json, time_result_json, WallClockSnapshot};

const MAX_OUTPUT_BYTES: u32 = 64 * 1024;

fn within_memory(ptr: u32, length: u32) -> bool {
    if ptr == 0 || length == 0 || length > MAX_OUTPUT_BYTES {
        return false;
    }
    #[cfg(target_arch = "wasm32")]
    {
        let memory_bytes = core::arch::wasm32::memory_size(0).saturating_mul(65_536);
        let offset = ptr as usize;
        let byte_length = length as usize;
        return offset <= memory_bytes && byte_length <= memory_bytes - offset;
    }
    #[cfg(not(target_arch = "wasm32"))]
    {
        true
    }
}

/// Allocate a zeroed output buffer in the module's linear memory.
#[no_mangle]
pub extern "C" fn hemant_alloc(length: u32) -> u32 {
    if length == 0 || length > MAX_OUTPUT_BYTES {
        return 0;
    }
    let boxed = vec![0_u8; length as usize].into_boxed_slice();
    Box::into_raw(boxed) as *mut u8 as u32
}

/// Release a buffer allocated by `hemant_alloc`.
///
/// # Safety
/// `ptr` and `length` must exactly match a live allocation returned by
/// `hemant_alloc`, and the buffer must not have been freed already.
#[no_mangle]
pub unsafe extern "C" fn hemant_free(ptr: u32, length: u32) {
    if within_memory(ptr, length) {
        let raw = core::ptr::slice_from_raw_parts_mut(ptr as *mut u8, length as usize);
        drop(Box::from_raw(raw));
    }
}

/// Write a `hemant.time-result/2` JSON document into `output`. `source` is 0
/// for the Worker wall clock and 1 for caller-supplied Unix nanoseconds.
/// Negative return values are fail-closed: -1 invalid clock/range, -2
/// serialization failure, -3 invalid output buffer, -4 insufficient capacity,
/// -5 unknown source.
///
/// # Safety
/// `output..output + capacity` must be a writable range in this module's linear
/// memory. Allocate it with `hemant_alloc` and release it with `hemant_free`.
#[no_mangle]
pub unsafe extern "C" fn hemant_time_result_json(
    source: u32,
    high: i64,
    low: i64,
    output: u32,
    capacity: u32,
) -> i32 {
    if !within_memory(output, capacity) {
        return -3;
    }
    let unix_nanos = ((high as i128) << 64) | (low as u64 as i128);
    let snapshot = match source {
        0 => WallClockSnapshot::from_worker_wall_clock_unix_nanos(unix_nanos),
        1 => WallClockSnapshot::from_supplied_unix_nanos(unix_nanos),
        _ => return -5,
    };
    let Ok(snapshot) = snapshot else {
        return -1;
    };
    let Ok(json) = time_result_json(&snapshot) else {
        return -2;
    };
    write_output(json.as_bytes(), output, capacity)
}

/// Write the canonical versioned method registry into `output`.
///
/// # Safety
/// `output..output + capacity` must be a writable range in this module's linear
/// memory. Allocate it with `hemant_alloc` and release it with `hemant_free`.
#[no_mangle]
pub unsafe extern "C" fn hemant_method_registry_json(output: u32, capacity: u32) -> i32 {
    if !within_memory(output, capacity) {
        return -3;
    }
    write_output(registry_json().as_bytes(), output, capacity)
}

unsafe fn write_output(bytes: &[u8], output: u32, capacity: u32) -> i32 {
    let Ok(length) = i32::try_from(bytes.len()) else {
        return -4;
    };
    if bytes.len() > capacity as usize {
        return -4;
    }
    let target = slice::from_raw_parts_mut(output as *mut u8, capacity as usize);
    target[..bytes.len()].copy_from_slice(bytes);
    length
}
