const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DB_PATH || (process.env.VERCEL ? '/tmp/csc.db' : './data/csc.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    privacy_consent INTEGER NOT NULL DEFAULT 1,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    what_we_do TEXT,
    typical_documents TEXT,
    disclaimer TEXT,
    price_note TEXT,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
  CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
  CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    razorpay_order_id TEXT UNIQUE NOT NULL,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'created',
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT,
    service TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(razorpay_order_id);
  CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
  CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
`);

const initDefaultAdmin = () => {
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get('admin');
  if (!admin) {
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash);
    console.log('Default admin created: admin / admin123');
  }
};

const initServices = () => {
  const count = db.prepare('SELECT COUNT(*) as count FROM services').get().count;
  if (count === 0) {
    const services = [
      {
        id: 'form-filling-assistance',
        category: 'online-forms',
        name: 'Online Form Filling Assistance',
        description: 'We help you fill out online forms accurately and completely, ensuring all required fields are properly completed.',
        icon: 'FileText',
        what_we_do: JSON.stringify([
          'Fill out government scheme application forms',
          'Assist with scholarship and education forms',
          'Help with job application forms',
          'Guide through pension and welfare scheme forms',
          'Assist with utility and service connection forms'
        ]),
        typical_documents: JSON.stringify([
          'Aadhaar card (or other valid ID proof)',
          'Passport-size photographs',
          'Educational certificates (if applicable)',
          'Income certificate (if applicable)',
          'Address proof',
          'Mobile number for OTP verification'
        ]),
        disclaimer: 'Required documents, eligibility criteria, fees, and processing times vary by the specific form and issuing authority. We assist with form filling only and do not guarantee approval.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'application-submission-guidance',
        category: 'online-forms',
        name: 'Application Submission Guidance',
        description: 'Step-by-step guidance for submitting applications on various government portals.',
        icon: 'Send',
        what_we_do: JSON.stringify([
          'Navigate government portals (e.g., Saral, e-District, state portals)',
          'Create and manage user accounts on portals',
          'Upload documents in correct format and size',
          'Track application status after submission',
          'Download acknowledgment receipts'
        ]),
        typical_documents: JSON.stringify([
          'Scanned copies of required documents',
          'Digital photographs as per specifications',
          'Digital signatures (if required)',
          'Mobile number and email for registration'
        ]),
        disclaimer: 'Portal availability, requirements, and processes are determined by respective government departments. We provide guidance based on current information.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'job-education-forms',
        category: 'online-forms',
        name: 'Job & Education Form Assistance',
        description: 'Specialized assistance for recruitment exams, admissions, and scholarship applications.',
        icon: 'GraduationCap',
        what_we_do: JSON.stringify([
          'Government job application forms (SSC, UPSC, state PSCs, etc.)',
          'University and college admission forms',
          'Scholarship applications (NSP, state scholarships)',
          'Entrance exam registration forms',
          'Skill development program registrations'
        ]),
        typical_documents: JSON.stringify([
          'Educational certificates and mark sheets',
          'Category certificates (SC/ST/OBC/EWS if applicable)',
          'Domicile certificate',
          'Passport-size photographs',
          'Signature and thumb impression scans'
        ]),
        disclaimer: 'Application deadlines, eligibility, and selection processes are set by recruiting/admitting bodies. We assist with form filling only.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'online-payment-guidance',
        category: 'online-payments',
        name: 'Online Payment Guidance',
        description: 'Safe and secure guidance for making online payments for government services, utilities, and more.',
        icon: 'CreditCard',
        what_we_do: JSON.stringify([
          'Guide through payment gateway steps',
          'Explain payment options (UPI, net banking, card, wallet)',
          'Help understand payment confirmation and receipts',
          'Assist with failed payment troubleshooting',
          'Educate on safe payment practices'
        ]),
        typical_documents: JSON.stringify([
          'Bill or challan with payment amount',
          'Registered mobile number for OTP',
          'Bank account/UPI details (entered by customer only)'
        ]),
        disclaimer: 'We NEVER ask for or store UPI PINs, OTPs, card PINs, passwords, or banking credentials. Customers enter payment details themselves. We only guide the process.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'passport-size-photo',
        category: 'photo-passport',
        name: 'Passport-Size Photo Services',
        description: 'Professional passport-size photographs for various official documents.',
        icon: 'Camera',
        what_we_do: JSON.stringify([
          'Capture passport-size photos (35mm x 45mm, 35mm x 35mm, etc.)',
          'Digital photo preparation for online forms',
          'Background color adjustment (white/blue/red as required)',
          'Photo resizing and formatting for specific portals',
          'Print multiple copies on photo paper'
        ]),
        typical_documents: JSON.stringify([
          'Customer presence for photo capture',
          'Specification requirements for the target document'
        ]),
        disclaimer: 'We provide photo services only. We do not issue passports or guarantee passport approval. Photo specifications must match the requirements of the issuing authority.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'digital-photo-preparation',
        category: 'photo-passport',
        name: 'Digital Photo Preparation & Formatting',
        description: 'Convert and format your existing photos for online applications.',
        icon: 'Image',
        what_we_do: JSON.stringify([
          'Resize photos to portal-specific dimensions',
          'Compress files to meet size limits (KB/MB)',
          'Change background color digitally',
          'Convert between formats (JPG, PNG, PDF)',
          'Crop and enhance photo quality'
        ]),
        typical_documents: JSON.stringify([
          'Digital copy of existing photograph',
          'Target portal specifications (dimensions, size, format)'
        ]),
        disclaimer: 'Digital modifications are for formatting purposes only. Final acceptance depends on the verifying authority.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'passport-application-guidance',
        category: 'photo-passport',
        name: 'Passport Application Guidance',
        description: 'Assistance with understanding the passport application process and requirements.',
        icon: 'Plane',
        what_we_do: JSON.stringify([
          'Explain passport application types (fresh, reissue, tatkal)',
          'Guide through Passport Seva portal registration',
          'Document checklist for different application types',
          'Appointment booking assistance',
          'Police verification process explanation'
        ]),
        typical_documents: JSON.stringify([
          'Proof of address (Aadhaar, utility bills, etc.)',
          'Proof of date of birth (birth certificate, school certificate)',
          'Photo ID proof',
          'Previous passport (for reissue)',
          'Additional documents per application type'
        ]),
        disclaimer: 'Passport issuance is solely at the discretion of the Passport Office, Ministry of External Affairs. We provide guidance only and do not guarantee approval.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'printing-services',
        category: 'document-services',
        name: 'Printing Services',
        description: 'High-quality printing for documents, forms, and photos.',
        icon: 'Printer',
        what_we_do: JSON.stringify([
          'Black & white and color printing',
          'A4, Legal, and custom paper sizes',
          'Single-sided and double-sided printing',
          'Multiple copies',
          'Photo paper printing'
        ]),
        typical_documents: JSON.stringify([
          'Digital file (PDF, Word, Image) or physical document to copy'
        ]),
        disclaimer: 'Print quality depends on source file resolution. We are not responsible for content accuracy of printed documents.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'scanning-services',
        category: 'document-services',
        name: 'Scanning Services',
        description: 'High-resolution document scanning with multiple format options.',
        icon: 'Scan',
        what_we_do: JSON.stringify([
          'Scan documents up to 600 DPI',
          'Save as PDF, JPG, PNG, or TIFF',
          'Multi-page PDF creation',
          'OCR (text recognition) for searchable PDFs',
          'Email or USB transfer of scanned files'
        ]),
        typical_documents: JSON.stringify([
          'Physical documents to be scanned'
        ]),
        disclaimer: 'Scanned copies are for reference. Original documents should be retained for official purposes.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'pdf-conversion',
        category: 'document-services',
        name: 'PDF Creation & Conversion',
        description: 'Create PDFs from various formats and convert PDFs to other formats.',
        icon: 'FileType',
        what_we_do: JSON.stringify([
          'Convert Word, Excel, PowerPoint to PDF',
          'Convert images to PDF',
          'Merge multiple files into single PDF',
          'Split PDF into separate pages',
          'Convert PDF to Word, Excel, JPG',
          'Compress PDF to reduce file size'
        ]),
        typical_documents: JSON.stringify([
          'Source files for conversion'
        ]),
        disclaimer: 'Conversion accuracy varies with document complexity. Formatting may not be perfectly preserved in all conversions.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'document-formatting',
        category: 'document-services',
        name: 'Document Formatting',
        description: 'Professional formatting and layout adjustment for documents.',
        icon: 'Layout',
        what_we_do: JSON.stringify([
          'Adjust margins, spacing, and alignment',
          'Create tables and structured layouts',
          'Add headers, footers, page numbers',
          'Format for official submission requirements',
          'Font and style standardization'
        ]),
        typical_documents: JSON.stringify([
          'Source document (digital or physical)',
          'Formatting guidelines (if any)'
        ]),
        disclaimer: 'We format documents as per provided specifications. Content accuracy remains the customer\'s responsibility.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'file-size-reduction',
        category: 'document-services',
        name: 'File Size Reduction',
        description: 'Optimize document and image file sizes for online uploads.',
        icon: 'Minimize',
        what_we_do: JSON.stringify([
          'Compress images while maintaining quality',
          'Reduce PDF file size',
          'Optimize for specific portal limits',
          'Batch processing for multiple files'
        ]),
        typical_documents: JSON.stringify([
          'Files needing size reduction',
          'Target size limit (if known)'
        ]),
        disclaimer: 'Excessive compression may reduce quality. Always verify compressed files meet portal requirements before submission.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'birth-certificate-guidance',
        category: 'certificate-assistance',
        name: 'Birth Certificate Process Guidance',
        description: 'Step-by-step guidance for birth certificate applications and corrections.',
        icon: 'Baby',
        what_we_do: JSON.stringify([
          'Explain birth registration process (within 21 days / delayed)',
          'Document checklist for new registration and corrections',
          'Guide through online portal (e.g., CRS, state portals)',
          'Assist with hospital records and affidavit preparation',
          'Explain fees and timelines as per local authority'
        ]),
        typical_documents: JSON.stringify([
          'Hospital discharge summary / birth proof',
          'Parents\' Aadhaar cards',
          'Parents\' marriage certificate (if available)',
          'Address proof',
          'Affidavit (for delayed registration)',
          'Existing birth certificate (for corrections)'
        ]),
        disclaimer: 'Birth certificate issuance is the responsibility of the local Registrar of Births & Deaths. Requirements, fees, and timelines vary by state/municipality. We provide guidance only.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'other-certificate-guidance',
        category: 'certificate-assistance',
        name: 'Other Certificate Application Guidance',
        description: 'Assistance with various certificate application processes.',
        icon: 'Award',
        what_we_do: JSON.stringify([
          'Caste certificate (SC/ST/OBC) guidance',
          'Income certificate guidance',
          'Domicile/residence certificate guidance',
          'Death certificate guidance',
          'Marriage certificate guidance',
          'Character certificate guidance'
        ]),
        typical_documents: JSON.stringify([
          'Varies by certificate type',
          'Generally: ID proof, address proof, supporting documents',
          'Affidavits as required'
        ]),
        disclaimer: 'Each certificate has specific eligibility, document requirements, fees, and issuing authorities. We provide general guidance only. Contact the relevant office for current official requirements.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'general-digital-assistance',
        category: 'general-digital',
        name: 'General Digital Assistance',
        description: 'Help with various online tasks and digital services.',
        icon: 'HelpCircle',
        what_we_do: JSON.stringify([
          'Assist with online portal navigation',
          'Help create email accounts and digital identities',
          'Guide for downloading certificates/documents',
          'Assist with Aadhaar update appointments (guidance only)',
          'Help with PAN card application guidance',
          'Support for digital literacy basics'
        ]),
        typical_documents: JSON.stringify([
          'Varies based on the specific task',
          'Generally: ID proof, address proof, photographs'
        ]),
        disclaimer: 'We provide assistance and guidance only. We are not an official government centre. Final decisions and approvals rest with respective authorities.',
        price_note: 'Contact us for applicable charges'
      },
      {
        id: 'enquiry-based-services',
        category: 'general-digital',
        name: 'Enquiry-Based Service Requests',
        description: 'Submit an enquiry for services not listed here. We will assess and guide you.',
        icon: 'MessageSquare',
        what_we_do: JSON.stringify([
          'Accept enquiries for unlisted digital services',
          'Assess feasibility and provide guidance',
          'Refer to appropriate resources if we cannot assist',
          'Follow up on your request'
        ]),
        typical_documents: JSON.stringify([
          'Details of the service needed',
          'Any relevant documents or reference numbers'
        ]),
        disclaimer: 'We cannot guarantee assistance for all requested services. Some services may require visiting official offices directly.',
        price_note: 'Contact us for applicable charges'
      }
    ];

    const stmt = db.prepare(`
      INSERT INTO services (id, category, name, description, icon, what_we_do, typical_documents, disclaimer, price_note)
      VALUES (@id, @category, @name, @description, @icon, @what_we_do, @typical_documents, @disclaimer, @price_note)
    `);

    const insertMany = db.transaction((services) => {
      for (const service of services) {
        stmt.run(service);
      }
    });

    insertMany(services);
    console.log('Default services inserted');
  }
};

initDefaultAdmin();
initServices();

module.exports = db;