import * as React from 'react';
import { Button } from '@maataa/ui/actions/Button';
import { MaataaIcon, type MaataaIconName } from '@maataa/ui/icons/MaataaIcon';
import './tlps-my-work.css';
export const MY_WORK_DESTINATIONS = [
 {id:'applications',label:'My Applications & Auditions',icon:'form',states:['Applications','Auditions'],description:'Return to submitted applications, audition requests and outcomes.'},
 {id:'offers',label:'My Offers & Negotiations',icon:'docs',states:['Offers','Negotiations'],description:'Keep offers, counteroffers and outstanding decisions together.'},
 {id:'bookings',label:'My Bookings',icon:'docs',states:['Upcoming','Completed','Cancelled'],description:'Return to booking details, dates and changes.'},
 {id:'approvals',label:'Approvals assigned to me',icon:'check',states:['Awaiting my review','Decided'],description:'Find decisions that need your attention and revisit earlier reviews.'},
 {id:'data-rooms',label:'My Data Room access and diligence',icon:'evidence',states:['Access requests','Accessible rooms','Diligence'],description:'Track access requests, shared documents and diligence follow-ups.'},
 {id:'distribution',label:'My Distributor Deals and Deliveries',icon:'arrow-right',states:['Deals','Deliveries'],description:'Return to deal discussions, delivery packages and outstanding requirements.'},
 {id:'billing',label:'My Invoices, Memberships, and Entitlements',icon:'metrics',states:['Invoices','Memberships','Entitlements'],description:'Keep invoices, membership status and granted access in one place.'},
 {id:'help',label:'Disputes, cancellations, and support requests',icon:'help',states:['Disputes','Cancellations','Support requests'],description:'Follow open issues, requested changes and support conversations.'},
] as const satisfies readonly {id:string;label:string;icon:MaataaIconName;states:readonly string[];description:string}[];
export function TlpsMyWork({route}:{route:string}){
 const id=route.split('/')[3];const selected=MY_WORK_DESTINATIONS.find(d=>d.id===id);const [tab,setTab]=React.useState('');
 React.useEffect(()=>setTab(''),[id]);
 return <section className="tlps-my-work"><header><h1>My work</h1><p>Personal work destinations are planned. Current project reviews and support requests are available inside Connected Projects.</p></header>
 <nav className="tlps-my-work-nav" aria-label="My work destinations">{MY_WORK_DESTINATIONS.map(d=><a key={d.id} href={`#/tlps/my-work/${d.id}`} aria-current={selected?.id===d.id?'page':undefined}><MaataaIcon name={d.icon} size={22}/><span>{d.label}<small className="tlps-service-state">Not connected yet</small></span></a>)}</nav>
 {selected?<section aria-labelledby="my-work-title"><h2 id="my-work-title">{selected.label}</h2><p>{selected.description}</p><nav className="tlps-my-work-filters" aria-label={`${selected.label} views`}>{selected.states.map(state=><Button key={state} variant="secondary" aria-pressed={(tab||selected.states[0])===state} onClick={()=>setTab(state)}>{state}</Button>)}</nav><h3>{tab||selected.states[0]}</h3><p role="status">This personal inbox is not connected yet. Your existing records have not been loaded here.</p><p>{selected.id==='approvals'?'Current pilot stage reviews are available inside your connected project; an assigned-to-me queue is still pending.':selected.id==='help'?'Current pilot support requests are saved inside their project. Cross-project support and dispute tracking are still pending.':'This destination is ready to return to. Its account-scoped records and actions still need a connected service.'}</p><a href="#/tlps/projects">Open connected projects</a>{['billing','data-rooms'].includes(selected.id)&&<p>Access, membership and financial status are not granted by opening this page.</p>}</section>:id?<section><h2>Work view not found</h2><a href="#/tlps/my-work">Back to My work</a></section>:<p>Choose a flow above to return to its requests, decisions and updates. Availability is shown inside each view.</p>}
 </section>;
}
