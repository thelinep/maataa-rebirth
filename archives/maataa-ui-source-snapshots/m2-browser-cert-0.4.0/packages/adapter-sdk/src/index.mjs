export function defineAdapter(descriptor, implementation) {
  if (!descriptor?.adapterId || !descriptor?.version || !descriptor?.protocol) throw new Error("INVALID_ADAPTER_DESCRIPTOR");
  for (const method of ["connect","disconnect","readState","dispatch"]) if (typeof implementation?.[method]!=="function") throw new Error(`ADAPTER_METHOD_REQUIRED:${method}`);
  return Object.freeze({descriptor:Object.freeze({...descriptor}),...implementation});
}
export function createCameraSimulatorAdapter(initial={pan:0,tilt:0,zoom:1,streamState:"streaming"}) {
  let connected=false;
  let state={...initial};
  const seen=new Set();
  return defineAdapter({adapterId:"sim.camera",version:"1.0.0",protocol:"simulator",capabilities:["camera.ptz","camera.read"],discovery:true,command:true,telemetry:true},{
    async connect(){connected=true;return {connected};},
    async disconnect(){connected=false;return {connected};},
    async readState(){if(!connected) throw new Error("ADAPTER_DISCONNECTED");return structuredClone(state);},
    async dispatch(command){
      if(!connected) return {ack:false,reason:"DISCONNECTED"};
      if(seen.has(command.idempotencyKey)) return {ack:false,reason:"REPLAY_DETECTED"};
      seen.add(command.idempotencyKey);
      if(command.capability!=="camera.ptz") return {ack:false,reason:"CAPABILITY_UNSUPPORTED"};
      state={...state,...command.payload};
      return {ack:true,commandId:command.commandId,observedState:structuredClone(state)};
    }
  });
}
