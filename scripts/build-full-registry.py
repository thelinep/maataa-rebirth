from pathlib import Path
import re, json, hashlib
root=Path(__file__).resolve().parent.parent

# Exact page-type vocabulary established in the MAATAA UI design session.
pages_text = r'''
1|Landing Page
2|Home Page
3|Marketing Home Page
4|Product Page
5|Product Suite Page
6|Feature Page
7|Solution Page
8|Industry Page
9|Use Case Page
10|Persona Page
11|Campaign Page
12|Launch Page
13|Coming Soon Page
14|Waitlist Page
15|About Page
16|Mission Page
17|Team Page
18|Careers Page
19|Press Page
20|Media Kit Page
21|Partner Page
22|Investor Page
23|Contact Page
24|Support Landing Page
25|Pricing Page
26|Pricing Comparison Page
27|FAQ Page
28|Testimonials Page
29|Case Study Page
30|Case Studies Index
31|Portfolio Page
32|Gallery Page
33|Blog Index
34|Blog Article
35|News Index
36|News Article
37|Documentation Home
38|Documentation Article
39|Knowledge Base Home
40|Knowledge Article
41|Tutorial Page
42|Guide Page
43|API Documentation Page
44|SDK Documentation Page
45|Changelog Page
46|Release Notes Page
47|Roadmap Page
48|Status Page
49|Trust Center Page
50|Security Page
51|Compliance Page
52|Privacy Policy Page
53|Terms Page
54|Cookie Policy Page
55|Refund Policy Page
56|Legal Notice Page
57|License Page
58|Accessibility Statement Page
59|Sign In Page
60|Sign Up Page
61|Sign Out Page
62|Forgot Password Page
63|Reset Password Page
64|Email Verification Page
65|Phone Verification Page
66|MFA Challenge Page
67|Passkey Page
68|SSO Page
69|Magic Link Page
70|Unlock Session Page
71|Session Expired Page
72|Account Confirmation Page
73|Invite Acceptance Page
74|Access Request Page
75|Permission Denied Page
76|Onboarding Welcome Page
77|Onboarding Profile Page
78|Onboarding Organisation Page
79|Onboarding Workspace Page
80|Onboarding Role Page
81|Onboarding Preferences Page
82|Onboarding Integration Page
83|Onboarding Completion Page
84|Dashboard Page
85|Executive Dashboard
86|Operational Dashboard
87|Analytics Dashboard
88|Personal Dashboard
89|Role Dashboard
90|Team Dashboard
91|Organisation Dashboard
92|Workspace Dashboard
93|Project Dashboard
94|Program Dashboard
95|Command Center Page
96|Control Room Page
97|Operations Wallboard Page
98|Cockpit Page
99|Overview Page
100|Index/List Page
101|Detail Page
102|Create Page
103|Edit Page
104|Clone Page
105|Review Page
106|Approval Page
107|Comparison Page
108|History Page
109|Activity Page
110|Audit Log Page
111|Version History Page
112|Diff Page
113|Timeline Page
114|Evidence Page
115|Relationships Page
116|Dependency Page
117|Search Page
118|Search Results Page
119|Advanced Search Page
120|Saved Searches Page
121|Filter Explorer Page
122|Data Table Page
123|Data Explorer Page
124|Data Browser Page
125|Data Detail Page
126|Schema Explorer Page
127|Schema Detail Page
128|Data Studio Page
129|Domain Registry Page
130|Domain Detail Page
131|Contract Registry Page
132|Contract Detail Page
133|API Studio Page
134|API Service Page
135|API Endpoint Page
136|API Request Builder Page
137|API Response Viewer Page
138|API Environment Page
139|API Mock Page
140|API Conformance Page
141|API Keys Page
142|Webhook Page
143|Webhook Delivery Page
144|Integration Catalog Page
145|Integration Detail Page
146|Integration Setup Page
147|Integration Connection Page
148|Developer Console Page
149|Code Studio Page
150|Code Editor Page
151|Repository Page
152|Repository Browser Page
153|Commit Detail Page
154|Branch Page
155|Pull Request Page
156|Issue Page
157|Build Page
158|CI/CD Page
159|Pipeline Detail Page
160|Deployment Page
161|Deployment History Page
162|Environment Page
163|Environment Detail Page
164|Infrastructure Page
165|Infrastructure Resource Page
166|Server Page
167|Service Page
168|Database Page
169|Database Explorer Page
170|Migration Page
171|Migration History Page
172|Backup Page
173|Restore Page
174|Observability Page
175|Metrics Page
176|Logs Page
177|Trace Page
178|Incident Page
179|Incident Detail Page
180|Alert Page
181|Alert Detail Page
182|Health Page
183|Topology Page
184|Network Page
185|Secret References Page
186|Configuration Page
187|Feature Flags Page
188|Workspace Page
189|Workspace Members Page
190|Organisation Page
191|Organisation Members Page
192|People Directory Page
193|Person Profile Page
194|User Profile Page
195|Account Page
196|Preferences Page
197|Settings Home Page
198|General Settings Page
199|Appearance Settings Page
200|Notification Settings Page
201|Security Settings Page
202|Privacy Settings Page
203|Language & Region Page
204|Connected Apps Page
205|Sessions Page
206|Devices Page
207|Roles Page
208|Role Detail Page
209|Permissions Page
210|Access Policies Page
211|Teams Page
212|Team Detail Page
213|Contacts Page
214|Contact Detail Page
215|CRM Accounts Page
216|CRM Account Detail Page
217|Leads Page
218|Lead Detail Page
219|Opportunities Page
220|Opportunity Detail Page
221|Pipeline Page
222|Inbox Page
223|Message Thread Page
224|Compose Message Page
225|Chat Page
226|Messenger Page
227|Announcements Page
228|Announcement Detail Page
229|Notifications Page
230|Notification Detail Page
231|Mail Page
232|Calendar Page
233|Calendar Event Page
234|Scheduler Page
235|Agenda Page
236|Tasks Page
237|Task Detail Page
238|Kanban Page
239|Scrum Board Page
240|Backlog Page
241|Sprint Page
242|Milestones Page
243|Gantt Page
244|Roadmap Planner Page
245|Project List Page
246|Project Detail Page
247|Project Workspace Page
248|Project Files Page
249|Project Team Page
250|Project Activity Page
251|Project Timeline Page
252|Project Settings Page
253|File Manager Page
254|File Detail Page
255|Document Library Page
256|Document Viewer Page
257|Document Editor Page
258|Spreadsheet Page
259|Presentation Page
260|Notes Page
261|Note Editor Page
262|Notebook Page
263|Whiteboard Page
264|Canvas Page
265|Diagram Page
266|Graph Page
267|Mind Map Page
268|Workflow Builder Page
269|Workflow Detail Page
270|Workflow Run Page
271|Workflow History Page
272|Automation Page
273|Automation Builder Page
274|Rule Builder Page
275|Form Builder Page
276|Form Page
277|Form Submission Page
278|Survey Builder Page
279|Survey Page
280|Page Builder Page
281|App Builder Page
282|Mobile Builder Page
283|Template Gallery Page
284|Template Detail Page
285|Component Gallery Page
286|Component Detail Page
287|Design System Page
288|Token Explorer Page
289|Theme Builder Page
290|Icon Library Page
291|Asset Library Page
292|Media Library Page
293|Image Detail Page
294|Video Detail Page
295|Audio Detail Page
296|Media Viewer Page
297|Lightbox Page
298|Video Editor Page
299|Audio Editor Page
300|Media Studio Page
301|Creative Studio Page
302|3D Studio Page
303|Spatial Studio Page
304|CAD Page
305|3D Preview Page
306|Floor Plan Page
307|Venue Layout Page
308|Map Page
309|Map Explorer Page
310|Route Planner Page
311|Location Detail Page
312|Digital Twin Page
313|Simulation Page
314|AI Home Page
315|AI Assistant Page
316|AI Chat Page
317|Agent Catalog Page
318|Agent Detail Page
319|Agent Builder Page
320|Agent Run Page
321|Prompt Library Page
322|Prompt Editor Page
323|Model Catalog Page
324|Model Detail Page
325|AI Playground Page
326|AI Evaluation Page
327|AI Observability Page
328|Knowledge Page
329|Knowledge Source Page
330|RAG/Index Page
331|Marketplace Home Page
332|Marketplace Search Page
333|Category Page
334|Listing Page
335|Vendor Directory Page
336|Vendor Profile Page
337|Vendor Dashboard Page
338|Service Catalog Page
339|Service Detail Page
340|SKU Catalog Page
341|SKU Detail Page
342|Compare Vendors Page
343|Wishlist Page
344|Favorites Page
345|Cart Page
346|Checkout Page
347|Order Confirmation Page
348|Orders Page
349|Order Detail Page
350|Booking Home Page
351|Booking Search Page
352|Booking Selection Page
353|Booking Review Page
354|Booking Payment Page
355|Booking Confirmation Page
356|Bookings Page
357|Booking Detail Page
358|Quote Page
359|Proposal Page
360|Proposal Builder Page
361|Contract Page
362|Invoice Page
363|Invoices Page
364|Payments Page
365|Payment Detail Page
366|Payouts Page
367|Transactions Page
368|Finance Dashboard Page
369|Budget Page
370|Expense Page
371|Revenue Page
372|Cash Flow Page
373|Forecast Page
374|Accounting Page
375|Ledger Page
376|Reconciliation Page
377|Tax Page
378|Investor Dashboard Page
379|Portfolio Page
380|Investment Detail Page
381|Fundraising Page
382|Cap Table Page
383|Event Discovery Page
384|Event Category Page
385|Event Detail Page
386|Event Builder Page
387|Event Dashboard Page
388|Event Production Page
389|Event Schedule Page
390|Event Guests Page
391|Guest Detail Page
392|Event Vendors Page
393|Event Services Page
394|Event Venue Page
395|Event Spatial Page
396|Event Sponsorship Page
397|Sponsor Detail Page
398|Event ROI Page
399|Event Settlement Page
400|Production Dashboard Page
401|Production Schedule Page
402|Call Sheet Page
403|Casting Page
404|Casting Detail Page
405|Crew Page
406|Crew Detail Page
407|Locations Page
408|Location Workspace Page
409|Shot List Page
410|Shot Detail Page
411|Storyboard Page
412|Scene Page
413|Script Page
414|Script Breakdown Page
415|Schedule Board Page
416|Equipment Page
417|Logistics Page
418|Travel Page
419|Accommodation Page
420|Transport Page
421|Permits Page
422|Insurance Page
423|Production Finance Page
424|Education Home Page
425|Course Catalog Page
426|Course Detail Page
427|Lesson Page
428|Quiz Page
429|Exam Page
430|Assignment Page
431|Progress Page
432|Certificate Page
433|Community Page
434|Forum Page
435|Discussion Detail Page
436|Members Page
437|Feed Page
438|404 Page
439|401 Page
440|403 Page
441|500 Page
442|502/503 Page
443|Offline Page
444|Maintenance Page
445|Rate Limit Page
446|Unsupported Browser Page
447|Upgrade Required Page
448|Empty State Page
449|Loading Page
450|Processing Page
451|Success Page
452|Failure Page
453|Confirmation Page
454|Redirect Page
455|Print Page
456|Share Page
457|Embed Page
458|Preview Page
459|Fullscreen Page
460|Kiosk Page
461|TV/Display Page
462|Wallboard Page
463|Demo Page
464|Sandbox Page
465|Playground Page
466|Prototype Page
467|Labs Page
468|Internal Tools Page
469|Admin Home Page
470|Admin Dashboard Page
471|System Settings Page
472|Feature Management Page
473|User Administration Page
474|Organisation Administration Page
475|Workspace Administration Page
476|Permission Administration Page
477|Integration Administration Page
478|Billing Administration Page
479|Content Administration Page
480|CMS Page
481|CMS Collection Page
482|CMS Entry Page
483|SEO Page
484|Redirect Management Page
485|Localization Page
486|Notification Administration Page
487|Jobs/Queue Page
488|Job Detail Page
489|Runtime Administration Page
490|Control Plane Page
491|Application Registry Page
492|Application Detail Page
493|Environment Registry Page
494|Database Targets Page
495|Infrastructure Inventory Page
496|Deployment Approval Page
497|Migration Approval Page
498|Release Readiness Page
499|Evidence Gate Page
500|Audit/Evidence Report Page
'''
page_names=[]
for line in pages_text.strip().splitlines():
    n,name=line.split('|',1); page_names.append((int(n),name.strip()))
assert len(page_names)==500 and page_names[-1][0]==500

page_groups = [
('P01','MARKETING_CORPORATE','Marketing & Corporate',1,30),
('P02','CONTENT_EDITORIAL','Content & Editorial',31,36),
('P03','DOCUMENTATION_DEVELOPER','Documentation & Developer',37,48),
('P04','LEGAL_TRUST','Legal & Trust',49,58),
('P05','AUTHENTICATION','Authentication',59,75),
('P06','ONBOARDING','Onboarding',76,83),
('P07','DASHBOARD_OVERVIEW','Dashboard & Overview',84,99),
('P08','ENTITY_CRUD','Entity CRUD',100,116),
('P09','SEARCH_DISCOVERY','Search & Discovery',117,121),
('P10','DATA_SCHEMA','Data & Schema',122,132),
('P11','API_INTEGRATION','API & Integration',133,148),
('P12','DEVELOPMENT_SOURCE','Development & Source',149,159),
('P13','INFRASTRUCTURE_RUNTIME','Infrastructure & Runtime',160,173),
('P14','OBSERVABILITY_RELIABILITY','Observability & Reliability',174,184),
('P15','ADMIN_CONFIGURATION','Administration & Configuration',185,213),
('P16','CRM_SALES','CRM & Sales',214,221),
('P17','COMMUNICATION','Communication',222,231),
('P18','PRODUCTIVITY_PLANNING','Productivity & Planning',232,244),
('P19','PROJECTS_PROGRAMS','Projects & Programs',245,252),
('P20','DOCUMENTS_FILES','Documents & Files',253,267),
('P21','BUILDERS_AUTOMATION','Builders & Automation',268,284),
('P22','DESIGN_SYSTEM','Design System',285,290),
('P23','MEDIA_CREATIVE','Media & Creative',291,301),
('P24','SPATIAL_3D','Spatial & 3D',302,313),
('P25','AI_KNOWLEDGE','AI & Knowledge',314,330),
('P26','MARKETPLACE_COMMERCE','Marketplace & Commerce',331,349),
('P27','BOOKING','Booking',350,357),
('P28','COMMERCIAL_FINANCE_INVESTMENT','Commercial, Finance & Investment',358,382),
('P29','EVENTS','Events',383,399),
('P30','PRODUCTION_LOGISTICS','Production & Logistics',400,423),
('P31','EDUCATION','Education',424,432),
('P32','COMMUNITY','Community',433,437),
('P33','SYSTEM_STATES','System States',438,449),
('P34','TRANSACTION_STATES','Transaction States',450,454),
('P35','PRESENTATION_MODES','Presentation Modes',455,462),
('P36','EXPERIMENTAL_INTERNAL','Experimental & Internal',463,468),
('P37','SYSTEM_ADMINISTRATION','System Administration',469,479),
('P38','CMS_PUBLISHING','CMS & Publishing',480,486),
('P39','OPERATIONS_ADMINISTRATION','Operations Administration',487,489),
('P40','CONTROL_PLANE','Control Plane',490,498),
('P41','EVIDENCE_APPROVAL','Evidence & Approval',499,500),
]

def slug(s):
    s=s.upper().replace('&',' AND ').replace('/',' ').replace('3D','THREE_D').replace('2D','TWO_D')
    s=re.sub(r'[^A-Z0-9]+','_',s).strip('_')
    return s

def camel(s):
    parts=re.split(r'[^A-Za-z0-9]+',s)
    out=''.join(p[:1].upper()+p[1:] for p in parts if p)
    if out and out[0].isdigit(): out='Page'+out
    return out

def page_group_for(n):
    for gid,key,label,a,b in page_groups:
        if a<=n<=b: return gid,key,label
    raise KeyError(n)

# Workspace taxonomy (58 groups) from the workspace design session.
workspace_groups = [
('W01','PERSONAL_HOME','Personal & Home Workspaces','Personal Workspace; My Work Workspace; Home Workspace; Today Workspace; My Tasks Workspace; My Calendar Workspace; My Notes Workspace; My Files Workspace; My Activity Workspace; My Notifications Workspace; My Approvals Workspace; My Drafts Workspace; Favorites Workspace; Recent Workspace; Saved Workspace'),
('W02','ORGANISATION','Organisation Workspaces','Organisation Workspace; Organisation Command Center; Organisation Operations Workspace; Organisation People Workspace; Organisation Finance Workspace; Organisation Projects Workspace; Organisation Documents Workspace; Organisation Analytics Workspace; Organisation Settings Workspace; Organisation Governance Workspace; Multi-Organisation Workspace'),
('W03','TEAM','Team Workspaces','Team Workspace; Department Workspace; Functional Team Workspace; Cross-Functional Workspace; Squad Workspace; Pod Workspace; Committee Workspace; Working Group Workspace; Leadership Workspace; Executive Workspace'),
('W04','PROJECT_PROGRAM','Project & Program Workspaces','Project Workspace; Program Workspace; Portfolio Workspace; Initiative Workspace; Workstream Workspace; Milestone Workspace; Project Planning Workspace; Project Execution Workspace; Project Review Workspace; Project Closure Workspace; Project Evidence Workspace'),
('W05','TASK_PRODUCTIVITY','Task & Productivity Workspaces','Task Workspace; Kanban Workspace; Scrum Workspace; Sprint Workspace; Backlog Workspace; Roadmap Workspace; Gantt Workspace; Timeline Workspace; Calendar Workspace; Scheduler Workspace; Agenda Workspace; Checklist Workspace; Approval Queue Workspace'),
('W06','COMMUNICATION','Communication Workspaces','Inbox Workspace; Mail Workspace; Messenger Workspace; Chat Workspace; Communication Hub; Thread Workspace; Announcement Workspace; Notification Center Workspace; Contact Workspace; Communication Campaign Workspace; Support Conversation Workspace'),
('W07','DOCUMENT_KNOWLEDGE','Documents & Knowledge Workspaces','Document Workspace; Document Editor Workspace; Spreadsheet Workspace; Presentation Workspace; Notes Workspace; Notebook Workspace; Knowledge Workspace; Knowledge Base Workspace; Wiki Workspace; Documentation Workspace; Research Workspace; Reference Library Workspace; Evidence Library Workspace'),
('W08','FILE_ASSET','File & Asset Workspaces','File Manager Workspace; Document Library Workspace; Asset Library Workspace; Media Library Workspace; Image Library Workspace; Video Library Workspace; Audio Library Workspace; Brand Asset Workspace; Template Library Workspace; Archive Workspace'),
('W09','DATA','Data Workspaces','Data Workspace; Data Explorer Workspace; Data Browser Workspace; Data Table Workspace; Data Studio Workspace; Dataset Workspace; Schema Workspace; Schema Explorer Workspace; Domain Registry Workspace; Contract Registry Workspace; Data Quality Workspace; Data Mapping Workspace; Data Import Workspace; Data Export Workspace'),
('W10','API','API Workspaces','API Studio Workspace; API Design Workspace; API Contract Workspace; API Explorer Workspace; API Testing Workspace; API Request Workspace; API Mock Workspace; API Conformance Workspace; API Environment Workspace; API Key Workspace; Webhook Workspace; Integration API Workspace'),
('W11','DEVELOPER','Developer Workspaces','Developer Workspace; Code Workspace; Code Studio Workspace; Repository Workspace; Source Browser Workspace; Branch Workspace; Pull Request Workspace; Issue Workspace; Build Workspace; CI Workspace; Pipeline Workspace; Release Engineering Workspace; SDK Workspace'),
('W12','APPLICATION_BUILDER','Application Builder Workspaces','App Builder Workspace; Web App Builder Workspace; Mobile App Builder Workspace; Desktop App Builder Workspace; Page Builder Workspace; Form Builder Workspace; Workflow Builder Workspace; Automation Builder Workspace; Rule Builder Workspace; Template Builder Workspace; Component Builder Workspace'),
('W13','UI_DESIGN_SYSTEM','UI & Design-System Workspaces','UI Studio Workspace; Design System Workspace; Component Studio Workspace; Component Gallery Workspace; Atomic Component Workspace; Layout Studio Workspace; Page Studio Workspace; Theme Studio Workspace; Token Studio Workspace; Typography Workspace; Icon Studio Workspace; Motion Workspace; Accessibility Workspace'),
('W14','CREATIVE','Creative Workspaces','Creative Studio Workspace; Design Workspace; Graphic Design Workspace; Brand Studio Workspace; Campaign Creative Workspace; Content Studio Workspace; Copy Workspace; Story Workspace; Storyboard Workspace; Moodboard Workspace; Whiteboard Workspace; Ideation Workspace'),
('W15','MEDIA_PRODUCTION','Media Production Workspaces','Media Studio Workspace; Image Editing Workspace; Video Editing Workspace; Audio Editing Workspace; Photo Workspace; Video Workspace; Audio Workspace; Motion Graphics Workspace; Post-Production Workspace; Review & Approval Workspace; Media Delivery Workspace'),
('W16','SPATIAL_3D','Spatial & 3D Workspaces','Spatial Workspace; Spatial Studio Workspace; CAD Workspace; 2D Plan Workspace; 3D Workspace; 3D Preview Workspace; Floor Plan Workspace; Venue Plan Workspace; Scene Workspace; Digital Twin Workspace; Simulation Workspace; Mapping Workspace; GIS Workspace; Route Planning Workspace; Location Workspace'),
('W17','AI','AI Workspaces','AI Workspace; AI Assistant Workspace; Agent Workspace; Agent Builder Workspace; Multi-Agent Workspace; Prompt Workspace; Prompt Studio Workspace; Model Workspace; Model Playground Workspace; AI Evaluation Workspace; AI Observability Workspace; AI Knowledge Workspace; RAG Workspace; Embedding Workspace; AI Workflow Workspace'),
('W18','ANALYTICS','Analytics Workspaces','Analytics Workspace; BI Workspace; Dashboard Workspace; Executive Analytics Workspace; Operational Analytics Workspace; Product Analytics Workspace; User Analytics Workspace; Marketing Analytics Workspace; Revenue Analytics Workspace; Finance Analytics Workspace; Funnel Workspace; Cohort Workspace; Report Builder Workspace'),
('W19','COMMAND_OPERATIONS','Command & Operations Workspaces','Command Center Workspace; Operations Center Workspace; Control Room Workspace; Mission Control Workspace; Cockpit Workspace; Operations Wallboard Workspace; Monitoring Workspace; Situation Room Workspace; Incident Command Workspace; Real-Time Operations Workspace'),
('W20','INFRASTRUCTURE','Infrastructure Workspaces','Infrastructure Workspace; Infrastructure Studio Workspace; Cloud Workspace; Server Workspace; Service Workspace; Runtime Workspace; Network Workspace; Storage Workspace; Queue Workspace; Compute Workspace; Resource Inventory Workspace; Infrastructure Topology Workspace'),
('W21','CONTROL_PLANE','Control Plane Workspaces','MAATAA Control Plane Workspace; Application Registry Workspace; Environment Registry Workspace; Runtime Registry Workspace; Database Target Workspace; Infrastructure Registry Workspace; Desired State Workspace; Observed State Workspace; Reconciliation Workspace; Deployment Control Workspace'),
('W22','ENVIRONMENT_RELEASE','Environment & Release Workspaces','Development Environment Workspace; Preview Environment Workspace; Test Environment Workspace; QA Workspace; Staging Workspace; Pilot Workspace; Production Workspace; Release Workspace; Release Readiness Workspace; Deployment Workspace; Rollback Workspace'),
('W23','DATABASE','Database Workspaces','Database Workspace; Database Studio Workspace; SQL Workspace; PostgreSQL Workspace; SQLite Workspace; libSQL Workspace; Database Target Workspace; Schema Migration Workspace; Migration Planning Workspace; Migration Review Workspace; Migration Execution Workspace; Database Recovery Workspace'),
('W24','RELIABILITY_OBSERVABILITY','Reliability & Observability Workspaces','Observability Workspace; Metrics Workspace; Logs Workspace; Traces Workspace; Health Workspace; Status Workspace; Alerts Workspace; Incident Workspace; Reliability Workspace; SRE Workspace; Backup Workspace; Restore Workspace; Disaster Recovery Workspace'),
('W25','SECURITY_IDENTITY','Security & Identity Workspaces','Identity Workspace; Authentication Workspace; Session Workspace; User Access Workspace; Role Workspace; Permission Workspace; Policy Workspace; RBAC Workspace; MFA Workspace; Security Operations Workspace; Security Review Workspace; Secret Reference Workspace; Device Security Workspace'),
('W26','GOVERNANCE_EVIDENCE','Governance & Evidence Workspaces','Governance Workspace; Evidence Workspace; Evidence Gate Workspace; Audit Workspace; Audit Trail Workspace; Compliance Workspace; Policy Workspace; Risk Workspace; Control Workspace; Review Workspace; Certification Workspace; Approval Workspace; Provenance Workspace'),
('W27','FINANCE','Finance Workspaces','Finance Workspace; Finance Command Center; Accounting Workspace; Ledger Workspace; Budget Workspace; Expense Workspace; Revenue Workspace; Cash Flow Workspace; Forecast Workspace; Reconciliation Workspace; Invoice Workspace; Payment Workspace; Payout Workspace; Tax Workspace; Treasury Workspace'),
('W28','INVESTMENT','Investment Workspaces','Investor Workspace; Investor Relations Workspace; Investment Workspace; Investment Committee Workspace; Portfolio Workspace; Fund Workspace; Fundraising Workspace; Deal Workspace; Due Diligence Workspace; Cap Table Workspace; Investment Analysis Workspace; Investment Evidence Workspace'),
('W29','CRM_SALES','CRM & Sales Workspaces','CRM Workspace; Sales Workspace; Sales Pipeline Workspace; Lead Workspace; Account Workspace; Opportunity Workspace; Deal Workspace; Customer Workspace; Contact Workspace; Sales Forecast Workspace; Sales Operations Workspace; Customer Success Workspace'),
('W30','MARKETING','Marketing Workspaces','Marketing Workspace; Campaign Workspace; Campaign Planning Workspace; Campaign Execution Workspace; Brand Workspace; Content Marketing Workspace; Social Media Workspace; Advertising Workspace; SEO Workspace; Marketing Automation Workspace; Marketing Analytics Workspace; Audience Workspace'),
('W31','COMMERCE','Commerce Workspaces','Commerce Workspace; Store Workspace; Catalog Workspace; Product Workspace; SKU Workspace; Cart Operations Workspace; Order Workspace; Checkout Workspace; Fulfilment Workspace; Returns Workspace; Pricing Workspace; Promotion Workspace; Inventory Workspace'),
('W32','MARKETPLACE','Marketplace Workspaces','Marketplace Workspace; Vendor Marketplace Workspace; Vendor Directory Workspace; Service Marketplace Workspace; Product Marketplace Workspace; Vendor Workspace; Vendor Onboarding Workspace; Vendor Operations Workspace; Service Catalog Workspace; Capability Workspace; Rate Workspace; Comparison Workspace'),
('W33','BOOKING','Booking Workspaces','Booking Workspace; Booking Builder Workspace; Booking Operations Workspace; Availability Workspace; Reservation Workspace; Quote Workspace; Proposal Workspace; Rate Review Workspace; Confirmation Workspace; Booking Fulfilment Workspace; Booking Settlement Workspace'),
('W34','EVENT','Event Workspaces','Event Workspace; Event Builder Workspace; Event Command Center; Event Planning Workspace; Event Production Workspace; Event Schedule Workspace; Event Guest Workspace; Event Vendor Workspace; Event Service Workspace; Event Venue Workspace; Event Spatial Workspace; Event Sponsorship Workspace; Event ROI Workspace; Event Settlement Workspace'),
('W35','TLPS_PRODUCTION','TLPS Production Workspaces','Production Workspace; Production Command Center; Project Production Workspace; Pre-Production Workspace; Shoot Workspace; Post-Production Workspace; Script Workspace; Script Breakdown Workspace; Scene Workspace; Shot Workspace; Shot List Workspace; Storyboard Workspace; Schedule Board Workspace'),
('W36','CASTING','Casting Workspaces','Casting Workspace; Casting Board Workspace; Casting Search Workspace; Talent Workspace; Artist Workspace; Audition Workspace; Casting Review Workspace; Casting Approval Workspace; Casting Availability Workspace; Casting Contract Workspace'),
('W37','CREW','Crew Workspaces','Crew Workspace; Crew Directory Workspace; Department Workspace; Crew Scheduling Workspace; Crew Availability Workspace; Crew Assignment Workspace; Crew Communication Workspace; Crew Contract Workspace'),
('W38','LOCATION_VENUE','Location & Venue Workspaces','Location Workspace; Location Scout Workspace; Location Library Workspace; Venue Workspace; Venue Search Workspace; Venue Comparison Workspace; Venue Planning Workspace; Venue Floor Plan Workspace; Location Approval Workspace; Permit Workspace'),
('W39','EQUIPMENT_LOGISTICS','Equipment & Logistics Workspaces','Logistics Workspace; Logistics Command Center; Equipment Workspace; Inventory Workspace; Equipment Assignment Workspace; Transport Workspace; Travel Workspace; Accommodation Workspace; Route Workspace; Shipment Workspace; Permit Workspace; Insurance Workspace'),
('W40','EVENT_GUEST','Event Guest Workspaces','Guest Workspace; Guest Directory Workspace; Invitation Workspace; RSVP Workspace; Guest Journey Workspace; Check-In Workspace; Access Workspace; Seating Workspace; Hospitality Workspace; VIP Workspace'),
('W41','SPONSORSHIP','Sponsorship Workspaces','Sponsorship Workspace; Sponsor Workspace; Sponsor Pipeline Workspace; Sponsor Package Workspace; Sponsor Activation Workspace; Deliverables Workspace; Brand Placement Workspace; Sponsorship ROI Workspace'),
('W42','EDUCATION','Education Workspaces','Learning Workspace; Course Workspace; Classroom Workspace; Lesson Workspace; Assignment Workspace; Quiz Workspace; Exam Workspace; Student Workspace; Teacher Workspace; Progress Workspace; Certificate Workspace; Curriculum Workspace'),
('W43','COMMUNITY','Community Workspaces','Community Workspace; Member Workspace; Forum Workspace; Discussion Workspace; Feed Workspace; Group Workspace; Community Moderation Workspace; Community Events Workspace'),
('W44','SUPPORT','Support Workspaces','Support Workspace; Help Desk Workspace; Ticket Workspace; Service Desk Workspace; Customer Support Workspace; Knowledge Support Workspace; Incident Support Workspace; SLA Workspace; Escalation Workspace'),
('W45','CMS_PUBLISHING','CMS & Publishing Workspaces','CMS Workspace; Content Collection Workspace; Content Entry Workspace; Editorial Workspace; Publishing Workspace; SEO Workspace; Localization Workspace; Translation Workspace; Redirect Workspace; Content Approval Workspace'),
('W46','PUBLIC_SITE','Public-Site Workspaces','Website Workspace; Landing Page Workspace; Marketing Site Workspace; Documentation Site Workspace; News Site Workspace; Blog Workspace; Portfolio Site Workspace; Careers Site Workspace; Investor Site Workspace; Trust Center Workspace'),
('W47','MOBILE','Mobile Workspaces','Mobile App Workspace; Mobile Builder Workspace; Mobile Preview Workspace; Device Preview Workspace; Offline Workspace; Sync Workspace; Mobile Navigation Workspace; Mobile Forms Workspace'),
('W48','DESKTOP','Desktop Workspaces','Desktop App Workspace; Desktop Builder Workspace; Multi-Window Workspace; Desktop Command Center; Local Files Workspace; Native Integration Workspace'),
('W49','REVIEW_DECISION','Review & Decision Workspaces','Review Workspace; Approval Workspace; Decision Workspace; Comparison Workspace; Diff Workspace; Evidence Review Workspace; Quality Review Workspace; Legal Review Workspace; Finance Review Workspace; Release Review Workspace'),
('W50','SYSTEM_ADMINISTRATION','System Administration Workspaces','Admin Workspace; Super Admin Workspace; User Administration Workspace; Organisation Administration Workspace; Workspace Administration Workspace; Roles & Permissions Workspace; System Configuration Workspace; Feature Flag Workspace; Integration Administration Workspace'),
('W51','OPERATIONS_ADMINISTRATION','Operations Administration Workspaces','Queue Administration Workspace; Job Administration Workspace; Notification Administration Workspace; Webhook Administration Workspace; Runtime Administration Workspace; Deployment Administration Workspace; Audit Administration Workspace'),
('W52','TESTING','Testing Workspaces','Test Workspace; QA Workspace; Browser Test Workspace; Component Test Workspace; Integration Test Workspace; E2E Workspace; Accessibility Test Workspace; Performance Test Workspace; Conformance Workspace; Regression Workspace'),
('W53','DEMO_EXPERIMENTAL','Demo & Experimental Workspaces','Demo Workspace; Sandbox Workspace; Playground Workspace; Prototype Workspace; Labs Workspace; Experimental Workspace; Preview Workspace; Showcase Workspace'),
('W54','PRESENTATION_DISPLAY','Presentation & Display Workspaces','Presentation Workspace; Fullscreen Workspace; Kiosk Workspace; TV Workspace; Wallboard Workspace; Public Display Workspace; Embedded Workspace; Share Workspace; Print Workspace'),
('W55','EMERGENCY_STATE','Emergency & State Workspaces','Maintenance Workspace; Recovery Workspace; Offline Workspace; Incident Workspace; Degraded Service Workspace; Emergency Operations Workspace'),
('W56','MAATAA_CORE_STUDIO','MAATAA Core Studio Workspaces','MAATAA UI Studio; MAATAA Domain Studio; MAATAA Data Studio; MAATAA API Studio; MAATAA Code Studio; MAATAA Workflow Studio; MAATAA Form Studio; MAATAA Page Studio; MAATAA App Studio; MAATAA Mobile Studio; MAATAA Theme Studio; MAATAA Agent Studio; MAATAA Knowledge Studio; MAATAA Infrastructure Studio; MAATAA Control Plane Studio'),
('W57','WORKSPACE_META','Workspace Meta/Management','Workspace Selector; Workspace Switcher; Workspace Directory; Workspace Creator; Workspace Template Gallery; Workspace Settings; Workspace Members; Workspace Roles; Workspace Permissions; Workspace Integrations; Workspace Activity; Workspace Audit; Workspace Archive'),
('W58','MULTI_WORKSPACE','Multi-Workspace Systems','Workspace Hub; Workspace Federation; Workspace Portfolio; Multi-Tenant Workspace Hub; Cross-Workspace Search; Cross-Workspace Activity; Cross-Workspace Analytics; Cross-Workspace Command Center'),
]

# Registry registry taxonomy (R000 + 176 governed registry types).
registry_groups = [
('UI_STRUCTURE', ['Workspace Registry','Page Registry','Layout Registry','Layout Atom Registry','Region Registry','Slot Registry','Component Registry','Atomic Component Registry','Compound Component Registry','Composition Registry','Pattern Registry','Template Registry']),
('VISUAL_SYSTEM', ['Design Token Registry','Theme Registry','Color Registry','Typography Registry','Spacing Registry','Radius Registry','Shadow/Elevation Registry','Motion Registry','Effect Registry','Breakpoint Registry','Density Registry','Z-Index/Layer Registry','Icon Registry','Illustration Registry','Asset Registry']),
('BEHAVIOR', ['State Registry','Interaction Registry','Action Registry','Command Registry','Event Registry','Gesture Registry','Keyboard Shortcut Registry','Focus Registry','Selection Registry','Drag-and-Drop Registry','Transition Registry']),
('NAVIGATION', ['Route Registry','Navigation Registry','Menu Registry','Breadcrumb Registry','Tab Registry','Deep-Link Registry','Entry-Point Registry','Redirect Registry']),
('RESPONSIVE_DEVICE', ['Viewport Registry','Device Registry','Responsive Transformation Registry','Input Modality Registry','Safe-Area Registry','Orientation Registry','Capability Registry']),
('ACCESSIBILITY', ['Accessibility Requirement Registry','ARIA Role Registry','Keyboard Behavior Registry','Focus Management Registry','Contrast Registry','Reduced Motion Registry','Touch Target Registry','Accessibility Evidence Registry']),
('CONTENT', ['Content Type Registry','Copy Pattern Registry','Message Registry','Error Message Registry','Empty-State Registry','Notification Registry','Locale Registry','Translation Key Registry','Formatting Registry']),
('FORMS', ['Field Registry','Input Registry','Validation Registry','Form Pattern Registry','Form Schema Registry','Form State Registry','Error Presentation Registry','Wizard Registry']),
('DATA_DISPLAY', ['Data View Registry','Column Registry','Filter Registry','Sort Registry','Pagination Registry','Chart Registry','Visualization Registry','Metric Registry']),
('DOMAIN_APPLICATION', ['Product Registry','Application Registry','Module Registry','Feature Registry','Capability Registry','Domain Registry','Entity Registry','Relationship Registry','Flow Registry','Journey Registry','Role Registry','Persona Registry']),
('IDENTITY_SECURITY', ['Actor Registry','Role Registry','Permission Registry','Policy Registry','Resource Registry','Session Registry','Authentication Method Registry','Security Control Registry']),
('API_INTEGRATION', ['API Service Registry','API Operation Registry','API Contract Registry','API Error Registry','API Environment Registry','Integration Registry','Provider Registry','Webhook Registry','Event Contract Registry','Adapter Registry']),
('RUNTIME_CONTROL_PLANE', ['Environment Registry','Runtime Registry','Service Registry','Database Target Registry','Storage Registry','Queue Registry','Infrastructure Registry','Network Registry','Secret Reference Registry','Deployment Registry','Build Registry','Artifact Registry']),
('OPERATIONS', ['Health Registry','Metric Registry','Log Source Registry','Trace Registry','Alert Registry','Incident Registry','SLO Registry','Backup Registry','Recovery Registry','RPO/RTO Registry']),
('GOVERNANCE_EVIDENCE', ['Provenance Registry','Evidence Registry','Audit Registry','Decision Registry','Approval Registry','Policy Registry','Gate Registry','Risk Registry','Exception Registry','Compliance Registry']),
('PACKAGE_DEVELOPER', ['Package Registry','Export Registry','Atomic Import Registry','Dependency Registry','Boundary Registry','Version Registry','Deprecation Registry','Compatibility Registry','Consumer Registry','Story Registry','Test Registry','Documentation Registry']),
('QUALITY', ['Test Case Registry','Certification Registry','Browser Support Registry','Device Support Registry','Performance Budget Registry','Accessibility Certification Registry','Visual Regression Registry','Known Issue Registry']),
('RELEASE_LIFECYCLE', ['Lifecycle Registry','Release Registry','Release Gate Registry','Migration Registry','Deployment Approval Registry','Rollback Registry','Change Registry','Breaking Change Registry']),
]

# Layout groups for the 100 layout archetypes already present in alpha.3.
layout_groups = {
'BASIC_CONTENT':['SingleColumnLayout','CenteredContainerLayout','FluidLayout','FixedLayout','FullBleedLayout','HeroContentLayout','EditorialLayout'],
'COLUMN_SYSTEMS':['TwoColumnLayout','ThreeColumnLayout','HolyGrailLayout','ResponsiveThreePaneLayout'],
'APP_SHELLS':['SidebarShellLayout','TopNavigationLayout','TopNavSidebarLayout','CollapsibleSidebarLayout','DoubleSidebarLayout','FixedAppShellLayout'],
'SPLIT_PANE':['SplitScreenLayout','MasterDetailLayout','ListDetailInspectorLayout','ResizableSplitPaneLayout','ScrollablePaneLayout'],
'GRID_SYSTEMS':['DashboardGridLayout','CardGridLayout','BentoGridLayout','MasonryLayout','ResponsiveAdaptiveLayout','IntrinsicLayout'],
'WORKSPACE':['WorkbenchLayout','IDELayout','StudioLayout','TabbedWorkspaceLayout','DockablePanelLayout','BuilderLayout','PageBuilderLayout','WorkflowBuilderLayout'],
'CANVAS_SPATIAL':['CanvasLayout','SpatialCADLayout','MapWorkspaceLayout'],
'DATA_ANALYTICS':['DataExplorerLayout','TableWorkspaceLayout','AnalyticsLayout','ComparisonLayout','BeforeAfterLayout'],
'PLANNING':['KanbanLayout','BoardLayout','TimelineLayout','GanttLayout','CalendarLayout','SchedulerLayout'],
'COMMUNICATION':['InboxLayout','ChatLayout','SocialFeedLayout','CRMLayout'],
'MEDIA':['GalleryLayout','LightboxLayout','MediaEditingLayout','VideoEditingLayout','PresentationLayout'],
'FORMS_PROCESS':['WizardLayout','StepperFormLayout','FormPreviewLayout','ApprovalWorkspaceLayout','ReviewLayout'],
'COMMERCE':['FacetedCommerceLayout','ProductDetailLayout','MarketplaceLayout','BookingLayout','CheckoutLayout','PricingLayout'],
'DOCUMENTATION':['DocumentEditorLayout','KnowledgeBaseLayout','DocumentationLayout','SearchResultsLayout'],
'MARKETING':['LandingPageLayout','MagazineLayout','NewspaperLayout'],
'RESPONSIVE_MOBILE':['MobileStackLayout','MobileTabLayout','BottomNavigationAppLayout','MobileMasterDetailLayout','SidebarToDrawerLayout','InspectorToSheetLayout'],
'OVERLAY_TEMPORARY':['AccordionLayout','DisclosureLayout','DrawerLayout','ModalWorkspaceLayout','BottomSheetLayout'],
'OPERATIONAL':['CommandCenterLayout','CockpitLayout','ControlRoomLayout','OperationsWallboardLayout','HUDLayout','KioskLayout','TVLargeScreenLayout','StickyHeaderLayout','StickySidebarLayout','StickyActionFooterLayout','SettingsLayout','ProfileLayout'],
}

# Utilities

def write(path, text):
    p=root/path; p.parent.mkdir(parents=True,exist_ok=True); p.write_text(text)

def ts_string(s): return json.dumps(s,ensure_ascii=False)

def component_atom(kind,name,tag='div'):
    return f'''import React from "react";\nimport {{ cx }} from "../utils";\n\nexport type {name}Props = React.HTMLAttributes<HTML{ "Heading" if tag.startswith("h") else "Div" if tag=="div" else "Element" }Element>;\n\nexport function {name}({{ className, ...props }}: {name}Props) {{\n  return <{tag} data-{kind}-region={ts_string(slug(name).lower().replace('_','-'))} className={{cx("m-{kind}-atom", "m-{kind}-{slug(name).lower().replace('_','-')}", className)}} {{...props}} />;\n}}\n'''

# Page atoms
page_atoms=['PageRoot','PageHeader','PageTitle','PageDescription','PageBreadcrumbs','PageHero','PageToolbar','PageActions','PageSummary','PageFilters','PageSearch','PageTabs','PageBody','PageContent','PageSection','PageSidebar','PageRail','PageInspector','PageGrid','PageList','PageDetails','PageMeta','PageStatus','PageFooter','PageEmpty','PageLoading','PageError']
for name in page_atoms:
    tag='h1' if name=='PageTitle' else 'div'
    # Keep types simple and portable.
    code=f'''import React from "react";\nimport {{ cx }} from "../utils";\n\nexport type {name}Props = React.HTMLAttributes<HTMLElement>;\n\nexport function {name}({{ className, ...props }}: {name}Props) {{\n  return <{tag} data-page-region={ts_string(slug(name).lower().replace('_','-'))} className={{cx("m-page-atom", "m-page-{slug(name).lower().replace('_','-')}", className)}} {{...props}} />;\n}}\n'''
    write(Path('src/page-atoms')/f'{name}.tsx',code)
write(Path('src/page-atoms/index.ts'),'\n'.join(f'export * from "./{n}";' for n in page_atoms)+'\n')

# Workspace atoms
workspace_atoms=['WorkspaceRoot','WorkspaceHeader','WorkspaceNav','WorkspaceSidebar','WorkspaceRail','WorkspaceToolbar','WorkspaceCommandBar','WorkspacePalette','WorkspaceFilters','WorkspaceList','WorkspaceMain','WorkspaceCanvas','WorkspaceDetails','WorkspaceInspector','WorkspaceProperties','WorkspaceTimeline','WorkspaceActivity','WorkspaceContext','WorkspacePanel','WorkspaceDock','WorkspaceActions','WorkspaceTabs','WorkspaceStatusBar','WorkspaceFooter']
for name in workspace_atoms:
    code=f'''import React from "react";\nimport {{ cx }} from "../utils";\n\nexport type {name}Props = React.HTMLAttributes<HTMLElement>;\n\nexport function {name}({{ className, ...props }}: {name}Props) {{\n  return <div data-workspace-region={ts_string(slug(name).lower().replace('_','-'))} className={{cx("m-workspace-atom", "m-workspace-{slug(name).lower().replace('_','-')}", className)}} {{...props}} />;\n}}\n'''
    write(Path('src/workspace-atoms')/f'{name}.tsx',code)
write(Path('src/workspace-atoms/index.ts'),'\n'.join(f'export * from "./{n}";' for n in workspace_atoms)+'\n')

# Page registry
page_records=[]
for n,name in page_names:
    gid,gkey,glabel=page_group_for(n)
    page_records.append({'ordinal':n,'id':f'PAGE.{gkey}.{slug(name.replace(" Page", ""))}','name':name,'groupId':gid,'groupKey':gkey,'groupLabel':glabel})
page_ts='''export type PageTypeRecord = Readonly<{ ordinal: number; id: string; name: string; groupId: string; groupKey: string; groupLabel: string }>;\n\n'''
page_ts+='export const PAGE_TYPES = '+json.dumps(page_records,ensure_ascii=False,indent=2).replace('"ordinal"','ordinal').replace('"id"','id').replace('"name"','name').replace('"groupId"','groupId').replace('"groupKey"','groupKey').replace('"groupLabel"','groupLabel')+' as const satisfies readonly PageTypeRecord[];\n\n'
page_ts+='export const PAGE_TYPE_BY_ID = new Map(PAGE_TYPES.map((page) => [page.id, page] as const));\n'
write(Path('src/registries/pageRegistry.ts'),page_ts)

# Page group metadata / barrels
pg_meta=[]
for gid,key,label,a,b in page_groups:
    entries=[r for r in page_records if r['groupId']==gid]
    pg_meta.append({'id':gid,'key':key,'label':label,'count':len(entries),'pageIds':[e['id'] for e in entries]})
    const=f'{key}_PAGES'
    code=f'import {{ PAGE_TYPES }} from "../registries/pageRegistry";\nexport const {const} = PAGE_TYPES.filter((page) => page.groupKey === {ts_string(key)});\n'
    write(Path('src/page-groups')/f'{key.lower()}.ts',code)
write(Path('src/page-groups/index.ts'),'\n'.join(f'export * from "./{key.lower()}";' for _,key,_,_,_ in page_groups)+'\n')
write(Path('src/registries/pageGroups.ts'),'export const PAGE_GROUPS = '+json.dumps(pg_meta,ensure_ascii=False,indent=2).replace('"id"','id').replace('"key"','key').replace('"label"','label').replace('"count"','count').replace('"pageIds"','pageIds')+' as const;\n')

# Generic page preset and thin reusable page template components
page_preset='''import React from "react";\nimport { cx } from "../utils";\nimport { PageRoot, PageHeader, PageBreadcrumbs, PageHero, PageToolbar, PageActions, PageSummary, PageFilters, PageSearch, PageTabs, PageBody, PageSidebar, PageRail, PageInspector, PageMeta, PageStatus, PageFooter } from "../page-atoms";\n\nexport type PagePresetProps = React.HTMLAttributes<HTMLDivElement> & { pageType?: string; header?: React.ReactNode; breadcrumbs?: React.ReactNode; hero?: React.ReactNode; toolbar?: React.ReactNode; actions?: React.ReactNode; summary?: React.ReactNode; filters?: React.ReactNode; search?: React.ReactNode; tabs?: React.ReactNode; sidebar?: React.ReactNode; rail?: React.ReactNode; inspector?: React.ReactNode; meta?: React.ReactNode; status?: React.ReactNode; footer?: React.ReactNode; body?: React.ReactNode; };\n\nexport function PagePreset({ pageType = "PAGE.GENERIC", className, children, header, breadcrumbs, hero, toolbar, actions, summary, filters, search, tabs, sidebar, rail, inspector, meta, status, footer, body, ...props }: PagePresetProps) {\n  return <PageRoot data-page-type={pageType} className={cx("m-page-preset", className)} {...props}>\n    {header !== undefined && <PageHeader>{header}</PageHeader>}\n    {breadcrumbs !== undefined && <PageBreadcrumbs>{breadcrumbs}</PageBreadcrumbs>}\n    {hero !== undefined && <PageHero>{hero}</PageHero>}\n    {toolbar !== undefined && <PageToolbar>{toolbar}</PageToolbar>}\n    {actions !== undefined && <PageActions>{actions}</PageActions>}\n    {summary !== undefined && <PageSummary>{summary}</PageSummary>}\n    {filters !== undefined && <PageFilters>{filters}</PageFilters>}\n    {search !== undefined && <PageSearch>{search}</PageSearch>}\n    {tabs !== undefined && <PageTabs>{tabs}</PageTabs>}\n    {sidebar !== undefined && <PageSidebar>{sidebar}</PageSidebar>}\n    <PageBody>{body ?? children}</PageBody>\n    {rail !== undefined && <PageRail>{rail}</PageRail>}\n    {inspector !== undefined && <PageInspector>{inspector}</PageInspector>}\n    {meta !== undefined && <PageMeta>{meta}</PageMeta>}\n    {status !== undefined && <PageStatus>{status}</PageStatus>}\n    {footer !== undefined && <PageFooter>{footer}</PageFooter>}\n  </PageRoot>;\n}\n'''
write(Path('src/pages/PagePreset.tsx'),page_preset)
page_templates=['MarketingPage','DocumentationPage','AuthPage','OnboardingPage','DashboardPage','ListPage','DetailPage','CreatePage','EditPage','ReviewPage','ApprovalPage','SearchPage','DataPage','StudioPage','BuilderPage','SettingsPage','ErrorPage','TransactionPage','PresentationPage','AdminPage','ControlPlanePage','EvidencePage']
for name in page_templates:
    code=f'''import React from "react";\nimport {{ PagePreset, type PagePresetProps }} from "./PagePreset";\n\nexport type {name}Props = Omit<PagePresetProps, "pageType"> & {{ pageType?: string }};\nexport function {name}({{ pageType = {ts_string('PAGE.TEMPLATE.'+slug(name.replace('Page','')))}, ...props }}: {name}Props) {{ return <PagePreset pageType={{pageType}} {{...props}} />; }}\n'''
    write(Path('src/pages')/f'{name}.tsx',code)
write(Path('src/pages/index.ts'),'\n'.join(['export * from "./PagePreset";']+[f'export * from "./{n}";' for n in page_templates])+'\n')

# Workspace registry
workspace_records=[]
ordinal=1
for gid,key,label,items_s in workspace_groups:
    items=[x.strip() for x in items_s.split(';') if x.strip()]
    seen=set()
    for name in items:
        wid=f'WORKSPACE.{key}.{slug(name.replace(" Workspace", ""))}'
        # IDs may collide only within duplicate generic names in a group; suffix deterministically.
        base=wid; i=2
        while wid in seen:
            wid=f'{base}_{i}'; i+=1
        seen.add(wid)
        workspace_records.append({'ordinal':ordinal,'id':wid,'name':name,'groupId':gid,'groupKey':key,'groupLabel':label}); ordinal+=1
workspace_ts='''export type WorkspaceTypeRecord = Readonly<{ ordinal: number; id: string; name: string; groupId: string; groupKey: string; groupLabel: string }>;\n\n'''
workspace_ts+='export const WORKSPACE_TYPES = '+json.dumps(workspace_records,ensure_ascii=False,indent=2).replace('"ordinal"','ordinal').replace('"id"','id').replace('"name"','name').replace('"groupId"','groupId').replace('"groupKey"','groupKey').replace('"groupLabel"','groupLabel')+' as const satisfies readonly WorkspaceTypeRecord[];\n\n'
workspace_ts+='export const WORKSPACE_TYPE_BY_ID = new Map(WORKSPACE_TYPES.map((workspace) => [workspace.id, workspace] as const));\n'
write(Path('src/registries/workspaceRegistry.ts'),workspace_ts)
wg_meta=[]
for gid,key,label,items_s in workspace_groups:
    entries=[r for r in workspace_records if r['groupId']==gid]
    wg_meta.append({'id':gid,'key':key,'label':label,'count':len(entries),'workspaceIds':[e['id'] for e in entries]})
    write(Path('src/workspace-groups')/f'{key.lower()}.ts',f'import {{ WORKSPACE_TYPES }} from "../registries/workspaceRegistry";\nexport const {key}_WORKSPACES = WORKSPACE_TYPES.filter((workspace) => workspace.groupKey === {ts_string(key)});\n')
write(Path('src/workspace-groups/index.ts'),'\n'.join(f'export * from "./{key.lower()}";' for _,key,_,_ in workspace_groups)+'\n')
write(Path('src/registries/workspaceGroups.ts'),'export const WORKSPACE_GROUPS = '+json.dumps(wg_meta,ensure_ascii=False,indent=2).replace('"id"','id').replace('"key"','key').replace('"label"','label').replace('"count"','count').replace('"workspaceIds"','workspaceIds')+' as const;\n')

# Workspace preset/templates
workspace_preset='''import React from "react";\nimport { cx } from "../utils";\nimport { WorkspaceRoot, WorkspaceHeader, WorkspaceNav, WorkspaceSidebar, WorkspaceRail, WorkspaceToolbar, WorkspaceCommandBar, WorkspacePalette, WorkspaceFilters, WorkspaceList, WorkspaceMain, WorkspaceCanvas, WorkspaceDetails, WorkspaceInspector, WorkspaceProperties, WorkspaceTimeline, WorkspaceActivity, WorkspaceContext, WorkspacePanel, WorkspaceDock, WorkspaceActions, WorkspaceTabs, WorkspaceStatusBar, WorkspaceFooter } from "../workspace-atoms";\n\nexport type WorkspacePresetProps = React.HTMLAttributes<HTMLDivElement> & { workspaceType?: string; header?: React.ReactNode; nav?: React.ReactNode; sidebar?: React.ReactNode; rail?: React.ReactNode; toolbar?: React.ReactNode; commandBar?: React.ReactNode; palette?: React.ReactNode; filters?: React.ReactNode; list?: React.ReactNode; main?: React.ReactNode; canvas?: React.ReactNode; details?: React.ReactNode; inspector?: React.ReactNode; properties?: React.ReactNode; timeline?: React.ReactNode; activity?: React.ReactNode; context?: React.ReactNode; panel?: React.ReactNode; dock?: React.ReactNode; actions?: React.ReactNode; tabs?: React.ReactNode; statusBar?: React.ReactNode; footer?: React.ReactNode; };\n\nexport function WorkspacePreset({ workspaceType = "WORKSPACE.GENERIC", className, children, header, nav, sidebar, rail, toolbar, commandBar, palette, filters, list, main, canvas, details, inspector, properties, timeline, activity, context, panel, dock, actions, tabs, statusBar, footer, ...props }: WorkspacePresetProps) {\n  return <WorkspaceRoot data-workspace-type={workspaceType} className={cx("m-workspace-preset", className)} {...props}>\n    {header !== undefined && <WorkspaceHeader>{header}</WorkspaceHeader>}\n    {nav !== undefined && <WorkspaceNav>{nav}</WorkspaceNav>}\n    {toolbar !== undefined && <WorkspaceToolbar>{toolbar}</WorkspaceToolbar>}\n    {commandBar !== undefined && <WorkspaceCommandBar>{commandBar}</WorkspaceCommandBar>}\n    {tabs !== undefined && <WorkspaceTabs>{tabs}</WorkspaceTabs>}\n    {sidebar !== undefined && <WorkspaceSidebar>{sidebar}</WorkspaceSidebar>}\n    {rail !== undefined && <WorkspaceRail>{rail}</WorkspaceRail>}\n    {palette !== undefined && <WorkspacePalette>{palette}</WorkspacePalette>}\n    {filters !== undefined && <WorkspaceFilters>{filters}</WorkspaceFilters>}\n    {list !== undefined && <WorkspaceList>{list}</WorkspaceList>}\n    {canvas !== undefined && <WorkspaceCanvas>{canvas}</WorkspaceCanvas>}\n    <WorkspaceMain>{main ?? children}</WorkspaceMain>\n    {details !== undefined && <WorkspaceDetails>{details}</WorkspaceDetails>}\n    {inspector !== undefined && <WorkspaceInspector>{inspector}</WorkspaceInspector>}\n    {properties !== undefined && <WorkspaceProperties>{properties}</WorkspaceProperties>}\n    {timeline !== undefined && <WorkspaceTimeline>{timeline}</WorkspaceTimeline>}\n    {activity !== undefined && <WorkspaceActivity>{activity}</WorkspaceActivity>}\n    {context !== undefined && <WorkspaceContext>{context}</WorkspaceContext>}\n    {panel !== undefined && <WorkspacePanel>{panel}</WorkspacePanel>}\n    {dock !== undefined && <WorkspaceDock>{dock}</WorkspaceDock>}\n    {actions !== undefined && <WorkspaceActions>{actions}</WorkspaceActions>}\n    {statusBar !== undefined && <WorkspaceStatusBar>{statusBar}</WorkspaceStatusBar>}\n    {footer !== undefined && <WorkspaceFooter>{footer}</WorkspaceFooter>}\n  </WorkspaceRoot>;\n}\n'''
write(Path('src/workspaces/WorkspacePreset.tsx'),workspace_preset)
workspace_templates=['PersonalWorkspace','OrganisationWorkspace','TeamWorkspace','ProjectWorkspace','ProductivityWorkspace','CommunicationWorkspace','DocumentWorkspace','DataWorkspace','APIStudioWorkspace','DeveloperWorkspace','BuilderWorkspace','DesignSystemWorkspace','CreativeStudioWorkspace','MediaStudioWorkspace','SpatialStudioWorkspace','AIWorkspace','AnalyticsWorkspace','CommandCenterWorkspace','InfrastructureWorkspace','ControlPlaneWorkspace','DatabaseWorkspace','ObservabilityWorkspace','SecurityWorkspace','GovernanceWorkspace','FinanceWorkspace','InvestmentWorkspace','CRMWorkspace','MarketingWorkspace','CommerceWorkspace','MarketplaceWorkspace','BookingWorkspace','EventWorkspace','ProductionWorkspace','EducationWorkspace','CommunityWorkspace','SupportWorkspace','AdminWorkspace','TestingWorkspace','PresentationWorkspace']
for name in workspace_templates:
    code=f'''import React from "react";\nimport {{ WorkspacePreset, type WorkspacePresetProps }} from "./WorkspacePreset";\n\nexport type {name}Props = Omit<WorkspacePresetProps, "workspaceType"> & {{ workspaceType?: string }};\nexport function {name}({{ workspaceType = {ts_string('WORKSPACE.TEMPLATE.'+slug(name.replace('Workspace','')))}, ...props }}: {name}Props) {{ return <WorkspacePreset workspaceType={{workspaceType}} {{...props}} />; }}\n'''
    write(Path('src/workspaces')/f'{name}.tsx',code)
write(Path('src/workspaces/index.ts'),'\n'.join(['export * from "./WorkspacePreset";']+[f'export * from "./{n}";' for n in workspace_templates])+'\n')

# Layout registry and group barrels, based on actual files.
layout_records=[]
layout_dir=root/'src/layouts'
layout_files={p.stem for p in layout_dir.glob('*Layout.tsx')}
ord=1
for group,items in layout_groups.items():
    for name in items:
        if name in layout_files:
            layout_records.append({'ordinal':ord,'id':f'LAYOUT.{group}.{slug(name.replace("Layout",""))}','name':name,'groupKey':group,'importPath':f'@maataa/ui/layouts/{name}' }); ord+=1
missing=sorted(layout_files-{x['name'] for x in layout_records})
for name in missing:
    layout_records.append({'ordinal':ord,'id':f'LAYOUT.OTHER.{slug(name.replace("Layout",""))}','name':name,'groupKey':'OTHER','importPath':f'@maataa/ui/layouts/{name}' }); ord+=1
layout_ts='''export type LayoutTypeRecord = Readonly<{ ordinal: number; id: string; name: string; groupKey: string; importPath: string }>;\n\n'''
layout_ts+='export const LAYOUT_TYPES = '+json.dumps(layout_records,ensure_ascii=False,indent=2).replace('"ordinal"','ordinal').replace('"id"','id').replace('"name"','name').replace('"groupKey"','groupKey').replace('"importPath"','importPath')+' as const satisfies readonly LayoutTypeRecord[];\n'
write(Path('src/registries/layoutRegistry.ts'),layout_ts)
for group,items in layout_groups.items():
    existing=[x for x in items if x in layout_files]
    write(Path('src/layout-groups')/f'{group.lower()}.ts','\n'.join(f'export {{ {n} }} from "../layouts/{n}";' for n in existing)+'\n')
write(Path('src/layout-groups/index.ts'),'\n'.join(f'export * from "./{g.lower()}";' for g in layout_groups)+'\n')

# Registry Registry definitions. Duplicate human names across namespaces are okay; IDs are namespace-scoped.
registry_defs=[{'ordinal':0,'id':'REGISTRY.REGISTRY','name':'Registry Registry','group':'META','authority':'@maataa/ui','kind':'meta'}]
idx=1
for group,names in registry_groups:
    for name in names:
        registry_defs.append({'ordinal':idx,'id':f'REGISTRY.{group}.{slug(name.replace(" Registry",""))}','name':name,'group':group,'authority':'@maataa/ui' if group in {'UI_STRUCTURE','VISUAL_SYSTEM','BEHAVIOR','NAVIGATION','RESPONSIVE_DEVICE','ACCESSIBILITY','CONTENT','FORMS','DATA_DISPLAY','PACKAGE_DEVELOPER','QUALITY'} else 'host-or-platform','kind':'catalog'}); idx+=1
# There may be duplicate conceptual registries across groups by design; stable IDs remain unique.
assert len({r['id'] for r in registry_defs})==len(registry_defs)
registry_ts='''export type RegistryDefinition = Readonly<{ ordinal: number; id: string; name: string; group: string; authority: string; kind: "meta" | "catalog" }>;\n\n'''
registry_ts+='export const REGISTRY_REGISTRY = '+json.dumps(registry_defs,ensure_ascii=False,indent=2).replace('"ordinal"','ordinal').replace('"id"','id').replace('"name"','name').replace('"group"','group').replace('"authority"','authority').replace('"kind"','kind')+' as const satisfies readonly RegistryDefinition[];\n'
write(Path('src/registries/registryRegistry.ts'),registry_ts)

# Registry index
write(Path('src/registries/index.ts'),'export * from "./registryRegistry";\nexport * from "./pageRegistry";\nexport * from "./pageGroups";\nexport * from "./workspaceRegistry";\nexport * from "./workspaceGroups";\nexport * from "./layoutRegistry";\n')

# Useful lightweight UI state/action/navigation/pattern registries (UI-only vocabulary, not runtime authority).
write(Path('src/registries/stateRegistry.ts'),'''export const UI_STATES = ["idle","loading","empty","ready","success","warning","error","disabled","read-only","offline","syncing","stale","selected","expanded","collapsed","active","inactive"] as const;\nexport type UIState = (typeof UI_STATES)[number];\n''')
write(Path('src/registries/actionRegistry.ts'),'''export const UI_ACTIONS = ["create","open","view","edit","save","save-draft","submit","approve","reject","archive","restore","delete","duplicate","compare","filter","sort","search","refresh","retry","export","import","print","share","download","upload","next","previous","cancel","close"] as const;\nexport type UIAction = (typeof UI_ACTIONS)[number];\n''')
write(Path('src/registries/interactionRegistry.ts'),'''export const UI_INTERACTIONS = ["click","double-click","hover","focus","blur","keyboard","drag","drop","resize","scroll","swipe","pinch","pan","zoom","select","multi-select","context-menu"] as const;\nexport type UIInteraction = (typeof UI_INTERACTIONS)[number];\n''')
write(Path('src/registries/navigationRegistry.ts'),'''export const NAVIGATION_PATTERNS = ["top-nav","sidebar","double-sidebar","tabs","breadcrumbs","bottom-nav","command-menu","drawer","stepper","pagination","master-detail","deep-link"] as const;\nexport type NavigationPattern = (typeof NAVIGATION_PATTERNS)[number];\n''')
write(Path('src/registries/patternRegistry.ts'),'''export const UI_PATTERNS = ["crud","master-detail","list-detail-inspector","wizard","review-approval","search-filter-results","dashboard","command-center","studio","builder","inbox","timeline","calendar","kanban","data-explorer","settings","onboarding","checkout"] as const;\nexport type UIPattern = (typeof UI_PATTERNS)[number];\n''')
# append exports
p=root/'src/registries/index.ts'; p.write_text(p.read_text()+'export * from "./stateRegistry";\nexport * from "./actionRegistry";\nexport * from "./interactionRegistry";\nexport * from "./navigationRegistry";\nexport * from "./patternRegistry";\n')

# Root exports
idxp=root/'src/index.ts'; txt=idxp.read_text()
for line in ['export * from "./page-atoms";','export * from "./pages";','export * from "./workspace-atoms";','export * from "./workspaces";','export * from "./registries";']:
    if line not in txt: txt += '\n'+line
idxp.write_text(txt+'\n')

# CSS additions
css='''\n/* Page/workspace composition primitives */\n.m-page-atom,.m-workspace-atom{box-sizing:border-box;min-width:0;}\n.m-page-preset{display:grid;grid-template-columns:minmax(0,1fr);min-width:0;}\n.m-page-pageheader,.m-page-pagebreadcrumbs,.m-page-pagehero,.m-page-pagetoolbar,.m-page-pageactions,.m-page-pagesummary,.m-page-pagefilters,.m-page-pagesearch,.m-page-pagetabs,.m-page-pagefooter{grid-column:1/-1;}\n.m-page-pagebody{min-width:0;}\n.m-workspace-preset{display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-rows:auto auto minmax(0,1fr) auto;min-height:0;min-width:0;}\n.m-workspace-workspaceheader,.m-workspace-workspacenav,.m-workspace-workspacetoolbar,.m-workspace-workspacecommandbar,.m-workspace-workspacetabs,.m-workspace-workspacestatusbar,.m-workspace-workspacefooter{grid-column:1/-1;}\n.m-workspace-workspacesidebar,.m-workspace-workspacerail{grid-column:1;}\n.m-workspace-workspacemain,.m-workspace-workspacecanvas{grid-column:2;min-width:0;min-height:0;}\n.m-workspace-workspaceinspector,.m-workspace-workspaceproperties,.m-workspace-workspacecontext{grid-column:3;}\n@media (max-width: 800px){.m-workspace-preset{grid-template-columns:minmax(0,1fr);}.m-workspace-workspacesidebar,.m-workspace-workspacerail,.m-workspace-workspacemain,.m-workspace-workspacecanvas,.m-workspace-workspaceinspector,.m-workspace-workspaceproperties,.m-workspace-workspacecontext{grid-column:1;}}\n'''
sp=root/'src/styles.css'; sp.write_text(sp.read_text()+css)

# package.json exports/files/scripts
pkg=json.loads((root/'package.json').read_text())
for cat in ['page-atoms','pages','workspace-atoms','workspaces','registries','page-groups','workspace-groups','layout-groups']:
    pkg['exports'][f'./{cat}']={'types':f'./dist/{cat}/index.d.ts','default':f'./dist/{cat}/index.js'}
    pkg['exports'][f'./{cat}/*']={'types':f'./dist/{cat}/*.d.ts','default':f'./dist/{cat}/*.js'}
for doc in ['docs/product/PAGES.md','docs/product/WORKSPACES.md','docs/product/REGISTRIES.md','docs/product/ARCHITECTURE.md','docs/release/FULL-STATUS.md','manifests/REGISTRY_MANIFEST.json','manifests/REGISTRY_MANIFEST.sha256']:
    if doc not in pkg['files']: pkg['files'].append(doc)
(root/'package.json').write_text(json.dumps(pkg,indent=2)+'\n')

# Update manifest scripts category sets
for script_name in ['api-manifest.mjs','atomic-manifest.mjs']:
    p=root/'scripts'/script_name; t=p.read_text()
    t=re.sub(r'const categories = \[[^\]]+\];', 'const categories = ["foundation","typography","actions","forms","navigation","surfaces","feedback","data","visualization","maps","mobile","themes","atomic","layout-atoms","layouts","page-atoms","pages","workspace-atoms","workspaces","registries","page-groups","workspace-groups","layout-groups"];', t)
    if script_name=='atomic-manifest.mjs': t=t.replace('architecture:"atomic-layout-aware"','architecture:"atomic-layout-page-workspace-registry-aware"')
    p.write_text(t)

# Docs
write(Path('docs/product/PAGES.md'), '# Page Registry\n\nThe package defines **500 page types** grouped into 41 page families. Page types are purpose metadata, not 500 monolithic screens. Reusable page templates compose independent `page-atoms`.\n\n'+ '\n'.join(f'## {gid} · {label}\n\n'+', '.join(name for n,name in page_names if a<=n<=b)+'\n' for gid,key,label,a,b in page_groups))
write(Path('docs/product/WORKSPACES.md'), '# Workspace Registry\n\nA workspace is a persistent operational environment that can host multiple pages and layouts. The package defines **58 workspace groups** and their named workspace types.\n\n'+ '\n'.join(f'## {gid} · {label}\n\n{items_s.replace(";", ",")}\n' for gid,key,label,items_s in workspace_groups))
write(Path('docs/product/REGISTRIES.md'), '# Registry Architecture\n\n`REGISTRY.REGISTRY` is the registry of registries. `@maataa/ui` owns UI vocabulary and metadata only. Runtime/auth/data/infrastructure registries are declared as integration vocabulary and remain host/platform authority.\n\n'+ '\n'.join(f'## {group}\n\n'+', '.join(names)+'\n' for group,names in registry_groups))
write(Path('docs/product/ARCHITECTURE.md'), '''# MAATAA UI Architecture\n\n```text\nRegistry Registry\n  ↓\nWorkspace Registry\n  ↓\nPage Registry\n  ↓\nLayout Registry\n  ↓\nRegion / Slot\n  ↓\nPattern / Composition\n  ↓\nComponent\n  ↓\nAtom\n```\n\n`@maataa/ui` remains visual and host-agnostic. Registry metadata must not be mistaken for backend runtime authority, authentication, authorization, persistence, infrastructure reality, migration approval, or deployment approval.\n''')

# Registry manifest JSON/hash
manifest={'schemaVersion':'1.0.0','package':'@maataa/ui','version':pkg['version'],'counts':{'pageTypes':len(page_records),'pageGroups':len(page_groups),'workspaceTypes':len(workspace_records),'workspaceGroups':len(workspace_groups),'layoutTypes':len(layout_records),'registryDefinitions':len(registry_defs)-1,'registryDefinitionsIncludingMeta':len(registry_defs),'pageAtoms':len(page_atoms),'workspaceAtoms':len(workspace_atoms),'pageTemplates':len(page_templates),'workspaceTemplates':len(workspace_templates)},'registries':{'pages':page_records,'pageGroups':pg_meta,'workspaces':workspace_records,'workspaceGroups':wg_meta,'layouts':layout_records,'registryRegistry':registry_defs}}
pretty=json.dumps(manifest,ensure_ascii=False,indent=2)+'\n'; write(Path('manifests/REGISTRY_MANIFEST.json'),pretty); h=hashlib.sha256(pretty.encode()).hexdigest(); write(Path('manifests/REGISTRY_MANIFEST.sha256'),f'{h}  REGISTRY_MANIFEST.json\n')

write(Path('docs/release/FULL-STATUS.md'), f'''# Full package status\n\n- version: `{pkg['version']}`\n- page types: **{len(page_records)}**\n- page groups: **{len(page_groups)}**\n- workspace types: **{len(workspace_records)}**\n- workspace groups: **{len(workspace_groups)}**\n- layout types: **{len(layout_records)}**\n- page atoms: **{len(page_atoms)}**\n- workspace atoms: **{len(workspace_atoms)}**\n- page templates: **{len(page_templates)}**\n- workspace templates: **{len(workspace_templates)}**\n- registry catalog definitions: **{len(registry_defs)-1}** plus `REGISTRY.REGISTRY`\n\nThis package is still alpha. Registry completeness is not production certification.\n''')

print(json.dumps(manifest['counts'],indent=2))

# Additional generated structural registries from the package source.
public_component_categories=['foundation','typography','actions','forms','navigation','surfaces','feedback','data','visualization','maps','mobile','themes','atomic','layout-atoms','layouts','page-atoms','pages','workspace-atoms','workspaces']
type_only_components={'ButtonProps','ButtonVariant','NavItemData','DataColumn','ChartPoint','MaataaTheme'}
component_records=[]
for category in public_component_categories:
    d=root/'src'/category
    if not d.exists(): continue
    for f in sorted(d.glob('*.tsx')):
        if f.name.startswith('_'): continue
        name=f.stem
        if name in type_only_components: kind='type'
        elif name in {'LayoutPreset','PagePreset','WorkspacePreset'}: kind='preset'
        elif category.endswith('-atoms') or category=='atomic': kind='atom'
        elif category=='layouts': kind='layout'
        elif category=='pages': kind='page-template'
        elif category=='workspaces': kind='workspace-template'
        else: kind='component'
        component_records.append({'id':f'COMPONENT.{slug(category)}.{slug(name)}','name':name,'category':category,'kind':kind,'importPath':f'@maataa/ui/{category}/{name}'})
comp_ts='''export type ComponentRegistryRecord = Readonly<{ id: string; name: string; category: string; kind: string; importPath: string }>;\n\n'''
comp_ts+='export const COMPONENT_REGISTRY = '+json.dumps(component_records,ensure_ascii=False,indent=2).replace('"id"','id').replace('"name"','name').replace('"category"','category').replace('"kind"','kind').replace('"importPath"','importPath')+' as const satisfies readonly ComponentRegistryRecord[];\n'
write(Path('src/registries/componentRegistry.ts'),comp_ts)
atomic_records=[r for r in component_records if r['kind']=='atom']
atomic_ts='''import type { ComponentRegistryRecord } from "./componentRegistry";\n'''
atomic_ts+='export const ATOMIC_COMPONENT_REGISTRY = '+json.dumps(atomic_records,ensure_ascii=False,indent=2).replace('"id"','id').replace('"name"','name').replace('"category"','category').replace('"kind"','kind').replace('"importPath"','importPath')+' as const satisfies readonly ComponentRegistryRecord[];\n'
write(Path('src/registries/atomicComponentRegistry.ts'),atomic_ts)

pkg=json.loads((root/'package.json').read_text())
export_records=[{'subpath':k,'kind':'package-export'} for k in sorted(pkg['exports'])]
write(Path('src/registries/exportRegistry.ts'),'export const EXPORT_REGISTRY = '+json.dumps(export_records,indent=2).replace('"subpath"','subpath').replace('"kind"','kind')+' as const;\n')
region_records=[]
for cat,prefix in [('layout-atoms','LAYOUT'),('page-atoms','PAGE'),('workspace-atoms','WORKSPACE')]:
    for f in sorted((root/'src'/cat).glob('*.tsx')):
        region_records.append({'id':f'REGION.{prefix}.{slug(f.stem)}','name':f.stem,'scope':prefix.lower(),'importPath':f'@maataa/ui/{cat}/{f.stem}'})
write(Path('src/registries/regionRegistry.ts'),'export const REGION_REGISTRY = '+json.dumps(region_records,indent=2).replace('"id"','id').replace('"name"','name').replace('"scope"','scope').replace('"importPath"','importPath')+' as const;\n')
write(Path('src/registries/themeRegistry.ts'),'''export const THEME_REGISTRY = [\n  { id: "THEME.LIGHT", name: "Light", mode: "light" },\n  { id: "THEME.DARK", name: "Dark", mode: "dark" },\n  { id: "THEME.SYSTEM", name: "System", mode: "system" },\n] as const;\n''')
write(Path('src/registries/tokenRegistry.ts'),'''export const TOKEN_LAYERS = ["raw","foundation","semantic","component"] as const;\nexport const TOKEN_FAMILIES = ["color","typography","spacing","radius","shadow","motion","z-index","breakpoint","focus","density"] as const;\n''')
write(Path('src/registries/templateRegistry.ts'), 'export const TEMPLATE_REGISTRY = '+json.dumps(
    [{'id':f'TEMPLATE.PAGE.{slug(n.replace("Page",""))}','name':n,'kind':'page','importPath':f'@maataa/ui/pages/{n}'} for n in page_templates]+[{'id':f'TEMPLATE.WORKSPACE.{slug(n.replace("Workspace",""))}','name':n,'kind':'workspace','importPath':f'@maataa/ui/workspaces/{n}'} for n in workspace_templates], indent=2).replace('"id"','id').replace('"name"','name').replace('"kind"','kind').replace('"importPath"','importPath')+' as const;\n')

p=root/'src/registries/index.ts'
t=p.read_text()
for n in ['componentRegistry','atomicComponentRegistry','exportRegistry','regionRegistry','themeRegistry','tokenRegistry','templateRegistry']:
    line=f'export * from "./{n}";\n'
    if line not in t: t+=line
p.write_text(t)

# Registry UI atoms and browser: presentation only.
registry_atoms=['RegistryRoot','RegistryHeader','RegistrySearch','RegistryGroup','RegistryItem','RegistryCount','RegistryStatus','RegistryMeta','RegistryDetails','RegistryActions','RegistryFilters','RegistryEmpty']
for name in registry_atoms:
    write(Path('src/registry-atoms')/f'{name}.tsx',f'''import React from "react";\nimport {{ cx }} from "../utils";\nexport type {name}Props = React.HTMLAttributes<HTMLElement>;\nexport function {name}({{ className, ...props }}: {name}Props) {{ return <div data-registry-region={ts_string(slug(name).lower().replace('_','-'))} className={{cx("m-registry-atom", "m-registry-{slug(name).lower().replace('_','-')}", className)}} {{...props}} />; }}\n''')
write(Path('src/registry-atoms/index.ts'),'\n'.join(f'export * from "./{n}";' for n in registry_atoms)+'\n')
write(Path('src/registry-ui/RegistryBrowser.tsx'),'''import React from "react";\nimport { RegistryRoot, RegistryHeader, RegistrySearch, RegistryGroup, RegistryItem, RegistryCount, RegistryEmpty } from "../registry-atoms";\nexport type RegistryBrowserItem = { id: string; name: string; group?: string };\nexport type RegistryBrowserProps = { title: string; items: readonly RegistryBrowserItem[]; query?: string; onQueryChange?: (value: string) => void };\nexport function RegistryBrowser({ title, items, query = "", onQueryChange }: RegistryBrowserProps) {\n  const normalized=query.trim().toLowerCase(); const visible=normalized ? items.filter((item)=>`${item.name} ${item.id} ${item.group ?? ""}`.toLowerCase().includes(normalized)) : items;\n  return <RegistryRoot><RegistryHeader><strong>{title}</strong> <RegistryCount>{visible.length}</RegistryCount></RegistryHeader>{onQueryChange && <RegistrySearch><input aria-label={`Search ${title}`} value={query} onChange={(event)=>onQueryChange(event.currentTarget.value)} /></RegistrySearch>}<RegistryGroup>{visible.length ? visible.map((item)=><RegistryItem key={item.id} data-registry-id={item.id}><strong>{item.name}</strong><small>{item.id}</small></RegistryItem>) : <RegistryEmpty>No matching registry entries.</RegistryEmpty>}</RegistryGroup></RegistryRoot>;\n}\n''')
write(Path('src/registry-ui/index.ts'),'export * from "./RegistryBrowser";\n')
# Add exports/index/package exports
idxp=root/'src/index.ts'; t=idxp.read_text()
for line in ['export * from "./registry-atoms";','export * from "./registry-ui";']:
    if line not in t: t+='\n'+line
t+='\n'; idxp.write_text(t)
pkg=json.loads((root/'package.json').read_text())
for cat in ['registry-atoms','registry-ui']:
    pkg['exports'][f'./{cat}']={'types':f'./dist/{cat}/index.d.ts','default':f'./dist/{cat}/index.js'}
    pkg['exports'][f'./{cat}/*']={'types':f'./dist/{cat}/*.d.ts','default':f'./dist/{cat}/*.js'}
(root/'package.json').write_text(json.dumps(pkg,indent=2)+'\n')
# Update scripts again with new categories.
for script_name in ['api-manifest.mjs','atomic-manifest.mjs']:
    p=root/'scripts'/script_name; t=p.read_text()
    cats='["foundation","typography","actions","forms","navigation","surfaces","feedback","data","visualization","maps","mobile","themes","atomic","layout-atoms","layouts","page-atoms","pages","workspace-atoms","workspaces","registry-atoms","registry-ui","registries","page-groups","workspace-groups","layout-groups"]'
    t=re.sub(r'const categories = \[[^\]]+\];', 'const categories = '+cats+';', t)
    p.write_text(t)
# Append CSS
sp=root/'src/styles.css'; sp.write_text(sp.read_text()+'''\n.m-registry-atom{box-sizing:border-box;min-width:0}.m-registry-registryroot{display:grid;gap:var(--m-space-3,12px)}.m-registry-registryheader{display:flex;align-items:center;justify-content:space-between;gap:12px}.m-registry-registrygroup{display:grid;gap:8px}.m-registry-registryitem{display:grid;gap:2px;padding:10px;border:1px solid var(--m-border,#d7d0c5);border-radius:var(--m-radius-md,10px)}.m-registry-registryitem small{opacity:.7}\n''')
# Tests and stories
write(Path('tests/registries.test.ts'),'''import { describe, expect, it } from "vitest";\nimport { PAGE_TYPES, WORKSPACE_TYPES, LAYOUT_TYPES, REGISTRY_REGISTRY, COMPONENT_REGISTRY, ATOMIC_COMPONENT_REGISTRY } from "../src/registries";\ndescribe("registry integrity", () => {\n  it("has the frozen catalog counts", () => { expect(PAGE_TYPES).toHaveLength(500); expect(LAYOUT_TYPES).toHaveLength(100); expect(REGISTRY_REGISTRY).toHaveLength(177); expect(WORKSPACE_TYPES.length).toBeGreaterThanOrEqual(600); });\n  it("has unique canonical IDs", () => { for (const list of [PAGE_TYPES,WORKSPACE_TYPES,LAYOUT_TYPES,REGISTRY_REGISTRY,COMPONENT_REGISTRY,ATOMIC_COMPONENT_REGISTRY]) expect(new Set(list.map((item)=>item.id)).size).toBe(list.length); });\n});\n''')
write(Path('stories/Registries.stories.tsx'),'''import type { Meta, StoryObj } from "@storybook/react";\nimport { RegistryBrowser } from "../src/registry-ui";\nimport { PAGE_TYPES } from "../src/registries";\nconst meta={ title:"Registries/Page Registry", component:RegistryBrowser } satisfies Meta<typeof RegistryBrowser>; export default meta; type Story=StoryObj<typeof meta>; export const Pages:Story={ args:{ title:"Page Registry", items:PAGE_TYPES.map((p)=>({id:p.id,name:p.name,group:p.groupLabel})) } };\n''')

# Refresh manifest with expanded component counts.
manifest=json.loads((root/'manifests/REGISTRY_MANIFEST.json').read_text())
manifest['counts']['componentRegistry']=len(component_records)
manifest['counts']['atomicComponentRegistry']=len(atomic_records)
manifest['counts']['regions']=len(region_records)
manifest['counts']['registryAtoms']=len(registry_atoms)
pretty=json.dumps(manifest,ensure_ascii=False,indent=2)+'\n'; write(Path('manifests/REGISTRY_MANIFEST.json'),pretty); h=hashlib.sha256(pretty.encode()).hexdigest(); write(Path('manifests/REGISTRY_MANIFEST.sha256'),f'{h}  REGISTRY_MANIFEST.json\n')
print(json.dumps({'components':len(component_records),'atomicComponents':len(atomic_records),'regions':len(region_records),'registryAtoms':len(registry_atoms)},indent=2))
