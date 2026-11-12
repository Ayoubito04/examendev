// Formato: enunciado, opciones (4), correcta (índice 0-3), explicación y tema (1-9).
// Unidades (Hoja de ruta oficial de Inglés Profesional GS):
// 1: Unit 1 · Starting as a Junior Web Developer — Present and Past Tenses
// 2: Unit 2 · Sprint Progress and Incident Stories — Present Perfect and Narrative Tenses
// 3: Unit 3 · Planning a Sprint — Future Forms
// 4: Unit 4 · Rules, Best Practices and Deductions — Modal Verbs
// 5: Unit 5 · Debugging and Making Technical Decisions — Conditionals
// 6: Unit 6 · Build, Test and Deploy — The Passive Voice and the Causative
// 7: Unit 7 · Describing Pages, Components and Users — Relative Clauses
// 8: Unit 8 · Dailies and Code Reviews — Reported Speech
// 9: Unit 9 · Comparing Web Technologies and Pitching the Final Demo — Comparatives & Superlatives

export default [
  // --- 20 preguntas originales (mantienen su posición 01..20 para conservar IDs) ---
  {
    tema: 6,
    enunciado: 'In an IT support ticket, what does the phrasal verb «back up» mean in: «Please make sure you back up the database before running the migration»?',
    opciones: [
      'Delete all records permanently',
      'Make a security copy of the data in case something goes wrong',
      'Move the physical server to another room',
      'Shut down the power supply immediately',
    ],
    correcta: 1,
    explicacion: '«To back up» (verb) means to create a copy of data for recovery purposes; the noun is written as one word or hyphenated: «a backup».',
  },
  {
    tema: 2,
    enunciado: 'Choose the correct option to complete the sentence: «The server ________ down for maintenance since 6:00 AM.»',
    opciones: ['is', 'was', 'has been', 'will be'],
    correcta: 2,
    explicacion: 'We use the Present Perfect («has been») with «since» + a point in time to describe a state that started in the past and continues in the present.',
  },
  {
    tema: 3,
    enunciado: 'Which of the following is the most appropriate and formal closing for a professional email when you DO NOT know the recipient’s name (e.g., starting with «Dear Sir or Madam»)?',
    opciones: ['Yours faithfully,', 'See ya,', 'Lots of love,', 'Cheers mate,'],
    correcta: 0,
    explicacion: 'In standard formal business English, «Dear Sir or Madam» matches with «Yours faithfully,», whereas «Dear Mr/Ms [Surname]» matches with «Yours sincerely,».',
  },
  {
    tema: 9,
    enunciado: 'In software development and networking, what does «throughput» refer to?',
    opciones: [
      'The physical weight of a rack server',
      'The actual amount of data or requests successfully processed or transmitted in a given period of time',
      'The password recovery form on a website',
      'An syntax error on line 1 of a script',
    ],
    correcta: 1,
    explicacion: '«Throughput» measures the real rate of successful message delivery or task processing per unit of time (e.g., requests per second or Mbps).',
  },
  {
    tema: 5,
    enunciado: 'Complete the First Conditional sentence used in a technical specification: «If the API response ________ longer than 5 seconds, the client will trigger a timeout error.»',
    opciones: ['took', 'takes', 'will take', 'would take'],
    correcta: 1,
    explicacion: 'In a First Conditional («If + Present Simple, will + infinitive»), the condition clause uses the Present Simple («takes»), never «will».',
  },
  {
    tema: 6,
    enunciado: 'In technical documentation, the Passive Voice is very common. Choose the correct passive form: «All user passwords ________ using bcrypt before being stored.»',
    opciones: ['hash', 'are hashed', 'is hashing', 'hashed'],
    correcta: 1,
    explicacion: 'Present Simple Passive is formed with «am/is/are + past participle» («are hashed»), focusing on the action rather than who performs it.',
  },
  {
    tema: 9,
    enunciado: 'What does the term «scalability» mean when describing a web application architecture?',
    opciones: [
      'The ability of a system to handle a growing amount of load or traffic by adding resources',
      'The screen resolution of a laptop monitor',
      'The process of translating the user interface into Spanish',
      'The expiration date of an SSL certificate',
    ],
    correcta: 0,
    explicacion: '«Scalability» (vertical or horizontal scaling) is the capacity of a system to grow and manage increased demand smoothly.',
  },
  {
    tema: 1,
    enunciado: 'What is the meaning of the phrasal verb «log in» (or «sign in»)?',
    opciones: [
      'To close the browser window',
      'To enter your credentials (username and password) to access a computer system or application',
      'To format a hard drive',
      'To print a document on paper',
    ],
    correcta: 1,
    explicacion: '«Log in / sign in» means to authenticate and start a session; the opposite is «log out / sign out».',
  },
  {
    tema: 1,
    enunciado: 'During a daily stand-up meeting (Scrum), a developer says: «I am currently looking into the memory leak.» What does «looking into» mean?',
    opciones: [
      'Ignoring the problem completely',
      'Investigating or examining the issue to find its cause',
      'Staring at the computer monitor without typing',
      'Deleting the production repository',
    ],
    correcta: 1,
    explicacion: 'The phrasal verb «to look into something» means to investigate, analyze, or examine a problem.',
  },
  {
    tema: 5,
    enunciado: 'Which word best completes the sentence in a bug report: «Steps to ________ the issue: 1. Open the login page, 2. Click Submit with an empty email field.»',
    opciones: ['reproduce', 'invent', 'translate', 'celebrate'],
    correcta: 0,
    explicacion: '«Steps to reproduce» is the standard expression in QA and bug tracking to explain how another developer can trigger the exact same bug.',
  },
  {
    tema: 8,
    enunciado: 'In Git and collaborative software development, what is a «Pull Request» (or «Merge Request»)?',
    opciones: [
      'An invoice sent to the customer for hosting costs',
      'A proposal to merge a set of changes from a feature branch into the main repository after code review',
      'A command that deletes the local operating system',
      'A hardware request to buy a new keyboard',
    ],
    correcta: 1,
    explicacion: 'A Pull Request (PR) lets teammates review code, leave comments, and run automated CI tests before merging the branch.',
  },
  {
    tema: 7,
    enunciado: 'Choose the correct relative pronoun: «A firewall is a network security system ________ monitors and controls incoming and outgoing traffic.»',
    opciones: ['who', 'which / that', 'whose', 'where'],
    correcta: 1,
    explicacion: 'For things, systems, or devices, we use «which» or «that» in defining relative clauses («who» is used for people).',
  },
  {
    tema: 4,
    enunciado: 'What does «deprecated» mean when you read it in the official documentation of a programming language or library?',
    opciones: [
      'It is the newest and fastest feature available',
      'The feature is still supported for now, but it is outdated, discouraged, and may be removed in future versions',
      'The code has been encrypted with a private key',
      'The library requires a paid subscription',
    ],
    correcta: 1,
    explicacion: 'When a method or API is marked as «deprecated», developers should avoid using it in new code and migrate to the recommended alternative.',
  },
  {
    tema: 3,
    enunciado: 'In an email to a client, what is the polite way to refer to a file you are sending along with the message?',
    opciones: [
      'Look at the thing I put below.',
      'Please find attached the technical report in PDF format.',
      'Download this right now.',
      'I threw a file in the mail.',
    ],
    correcta: 1,
    explicacion: '«Please find attached...» or «I have attached...» are the standard polite business English formulas for email attachments.',
  },
  {
    tema: 2,
    enunciado: 'What is «downtime» in system administration and cloud services?',
    opciones: [
      'The time when employees go for lunch',
      'A period of time during which a server, network, or service is unavailable or offline',
      'The speed at which files are downloaded from a CDN',
      'The bottom margin of a web page',
    ],
    correcta: 1,
    explicacion: '«Downtime» is the opposite of «uptime» (high availability aims for 99.99% uptime, minimizing downtime).',
  },
  {
    tema: 4,
    enunciado: 'Choose the correct modal verb for a mandatory security policy: «Employees ________ share their private SSH keys with anyone.»',
    opciones: ['don’t have to', 'must not (mustn’t)', 'might', 'could'],
    correcta: 1,
    explicacion: '«Must not» expresses strict prohibition, whereas «don’t have to» means there is no obligation (it is optional).',
  },
  {
    tema: 1,
    enunciado: 'In a job interview for a Junior Developer position, if the interviewer asks «What are your greatest strengths?», what are they asking about?',
    opciones: [
      'How much weight you can lift at the gym',
      'Your strongest professional skills, qualities, and areas where you excel',
      'Your minimum salary expectations',
      'Why you left your previous school',
    ],
    correcta: 1,
    explicacion: '«Strengths» refers to your strong points (both technical and soft skills), while «weaknesses» refers to areas for improvement.',
  },
  {
    tema: 4,
    enunciado: 'What does «troubleshooting» mean in IT?',
    opciones: [
      'Creating new bugs intentionally',
      'The systematic process of diagnosing and identifying the source of a problem in a system to fix it',
      'Buying new office furniture',
      'Writing user manuals for marketing',
    ],
    correcta: 1,
    explicacion: '«Troubleshooting» is the logical step-by-step isolation and resolution of hardware, network, or software issues.',
  },
  {
    tema: 5,
    enunciado: 'Complete the Second Conditional sentence: «If we ________ more RAM on the database server, queries would run much faster.»',
    opciones: ['have', 'had', 'will have', 'having'],
    correcta: 1,
    explicacion: 'The Second Conditional («If + Past Simple, would + infinitive») is used for hypothetical situations in the present («If we had...»).',
  },
  {
    tema: 6,
    enunciado: 'What does the acronym «SLA» stand for in IT service contracts?',
    opciones: [
      'Service Level Agreement',
      'System Local Administrator',
      'Software License Application',
      'Simple Linux Architecture',
    ],
    correcta: 0,
    explicacion: 'A Service Level Agreement (SLA) is a contract between a service provider and a customer defining the expected level of service, such as uptime percentage and response times.',
  },

  // --- Nuevas preguntas (21..36) para cubrir las 9 Unidades de la Hoja de Ruta ---
  {
    tema: 1,
    enunciado: 'In Unit 1 (Present and Past Tenses), which sentence correctly uses «used to» to describe a past technical habit that is no longer true?',
    opciones: [
      'We use to deploy our code manually via FTP every Friday.',
      'We used to deploy our code manually via FTP, but now we use an automated CI/CD pipeline.',
      'We are used to deploy our code tomorrow morning.',
      'We used to deploying our code right now.',
    ],
    correcta: 1,
    explicacion: '«Used to + infinitive» expresses a past habit or state that no longer happens in the present.',
  },
  {
    tema: 2,
    enunciado: 'In an incident report (Unit 2 · Narrative Tenses), choose the correct verb forms: «While the team ________ the new release, the database connection suddenly ________.»',
    opciones: [
      'was deploying / dropped',
      'deployed / was dropping',
      'has deployed / drops',
      'will deploy / had dropped',
    ],
    correcta: 0,
    explicacion: 'We use the Past Continuous («was deploying») for the longer action in progress, and the Past Simple («dropped») for the short interrupting event.',
  },
  {
    tema: 2,
    enunciado: 'During a daily stand-up, a developer wants to emphasize an ongoing activity that started recently and is still in progress: «I ________ on the OAuth2 integration all morning.» Which tense fits best?',
    opciones: [
      'have been working',
      'worked',
      'work',
      'had worked',
    ],
    correcta: 0,
    explicacion: 'The Present Perfect Continuous («have/has been + -ing») highlights the duration of a recent, ongoing activity.',
  },
  {
    tema: 3,
    enunciado: 'In Sprint Planning (Unit 3 · Future Forms), which sentence correctly uses the Future Continuous to describe an action that will be in progress at a specific time in the future?',
    opciones: [
      'Tomorrow at 10:00 AM, don’t restart the staging server because we will be running the load tests.',
      'Tomorrow at 10:00 AM, we run the load tests yesterday.',
      'Tomorrow at 10:00 AM, we have run the load tests.',
      'Tomorrow at 10:00 AM, we would ran the load tests.',
    ],
    correcta: 0,
    explicacion: 'The Future Continuous («will be + -ing») describes an activity that will be in progress at a specific future moment.',
  },
  {
    tema: 3,
    enunciado: 'When talking about a fixed arrangement in a shared calendar (with date, time, and participants agreed), which form is most natural in English?',
    opciones: [
      'We are meeting the cybersecurity auditors on Thursday at 11:00.',
      'We might met the cybersecurity auditors on Thursday.',
      'We meeting the cybersecurity auditors yesterday.',
      'We have met the cybersecurity auditors next Thursday.',
    ],
    correcta: 0,
    explicacion: 'The Present Continuous («are meeting») is standard for fixed future arrangements already scheduled in a calendar.',
  },
  {
    tema: 4,
    enunciado: 'In Unit 4 (Modal Verbs of Deduction), the production API returns HTTP 500, but the database server CPU is at 2% and all queries succeed. Which deduction is grammatically and logically correct?',
    opciones: [
      'The issue can’t be the database; it must be a bug in the backend controller.',
      'The issue mustn’t be the database; it should to be the controller.',
      'The issue don’t have to be the database.',
      'The issue cans be the database.',
    ],
    correcta: 0,
    explicacion: 'For logical deductions in the present, «can’t be» expresses certainty that something is impossible, and «must be» expresses near certainty that something is true.',
  },
  {
    tema: 5,
    enunciado: 'In a post-mortem meeting (Unit 5 · Third Conditional), how do you express a past regret about an outage?',
    opciones: [
      'If we had tested the migration script in staging, the production database wouldn’t have crashed.',
      'If we test the migration script in staging, the database wouldn’t crash yesterday.',
      'If we would have tested the script, the database had not crashed.',
      'If we tested the script, the database will not crash.',
    ],
    correcta: 0,
    explicacion: 'The Third Conditional («If + Past Perfect, would have + past participle») analyses hypothetical past situations and their consequences.',
  },
  {
    tema: 6,
    enunciado: 'In Unit 6 (The Causative: «have/get something done»), which sentence correctly expresses that our company outsourced the penetration test to an external security firm?',
    opciones: [
      'We had our web application audited by an external cybersecurity firm last month.',
      'We had audited our web application ourselves last month.',
      'We have our web application audit by ourselves.',
      'We got audited the firm to our application.',
    ],
    correcta: 0,
    explicacion: 'The causative structure «have/get + object + past participle» («had our web application audited») indicates that we arranged for someone else to perform the service.',
  },
  {
    tema: 7,
    enunciado: 'In Unit 7 (Relative Clauses), choose the correct relative word to complete the sentence: «`/api/auth/login` is the endpoint ________ users send their credentials to obtain a JWT.»',
    opciones: ['where', 'who', 'whose', 'whom'],
    correcta: 0,
    explicacion: '«Where» (or «to which») is used in relative clauses to refer to a place, URL path, or environment where an action happens.',
  },
  {
    tema: 7,
    enunciado: 'Identify the correct Non-Defining Relative Clause (which adds extra, non-essential information between commas):',
    opciones: [
      'PostgreSQL, which is an open-source relational database, supports JSONB indexing natively.',
      'PostgreSQL, that is an open-source relational database, supports JSONB indexing natively.',
      'PostgreSQL, who is an open-source relational database, supports JSONB indexing.',
      'PostgreSQL which is an open-source relational database supports JSONB.',
    ],
    correcta: 0,
    explicacion: 'In non-defining relative clauses (between commas), we must use «which» for things and «who» for people; «that» cannot be used after a comma.',
  },
  {
    tema: 7,
    enunciado: 'Which sentence correctly uses a Defining Relative Clause to describe a user role?',
    opciones: [
      'An administrator is a user who has permission to manage roles and system settings.',
      'An administrator is a user which has permission to manage roles.',
      'An administrator is a user where has permission to manage roles.',
      'An administrator is a user whose has permission to manage roles.',
    ],
    correcta: 0,
    explicacion: 'In defining relative clauses referring to people/users, we use «who» (or «that») as the subject pronoun.',
  },
  {
    tema: 8,
    enunciado: 'In Unit 8 (Reported Speech), during the daily stand-up Sara said: «I fixed the CORS bug yesterday.» How do you report her statement later?',
    opciones: [
      'Sara said that she had fixed the CORS bug the day before.',
      'Sara told that she fixes the CORS bug yesterday.',
      'Sara said me that she has fixed the CORS bug tomorrow.',
      'Sara asked that she fixed the CORS bug.',
    ],
    correcta: 0,
    explicacion: 'In Reported Speech, Past Simple («fixed») shifts back to Past Perfect («had fixed»), and «yesterday» changes to «the day before / the previous day».',
  },
  {
    tema: 8,
    enunciado: 'In a code review, the tech lead asked: «Did you write unit tests for this controller?» How do you report this question in Reported Speech?',
    opciones: [
      'The tech lead asked if I had written unit tests for that controller.',
      'The tech lead asked did I write unit tests for that controller.',
      'The tech lead told if had I written unit tests.',
      'The tech lead said whether did I wrote unit tests.',
    ],
    correcta: 0,
    explicacion: 'When reporting a Yes/No question, we use «asked + if/whether + subject + verb» (affirmative word order, without auxiliary «did») and shift the tense back.',
  },
  {
    tema: 8,
    enunciado: 'Which reporting verb structure is grammatically correct when summarizing a colleague’s recommendation in a meeting?',
    opciones: [
      'Carlos suggested refactoring the authentication middleware before the release.',
      'Carlos suggested to refactor the authentication middleware.',
      'Carlos suggested us refactor the authentication middleware.',
      'Carlos told refactoring the authentication middleware.',
    ],
    correcta: 0,
    explicacion: 'The verb «suggest» is followed by «-ing» («suggested refactoring») or a «that» clause («suggested that we refactor»), never «suggest to do».',
  },
  {
    tema: 9,
    enunciado: 'In Unit 9 (Advanced Comparatives), which sentence correctly uses a correlative comparative («the more..., the more...») to describe system performance?',
    opciones: [
      'The more concurrent requests the server receives, the higher the memory consumption becomes.',
      'More concurrent requests the server receives, more higher the memory becomes.',
      'The most requests the server receives, the wildest memory consumption.',
      'As more requests the server receives, than higher the memory.',
    ],
    correcta: 0,
    explicacion: 'The structure «The + comparative ..., the + comparative ...» expresses how two trends change together in proportion.',
  },
  {
    tema: 9,
    enunciado: 'When pitching a final demo to an international client (Unit 9), which sentence correctly emphasizes a big difference between two algorithms?',
    opciones: [
      'Indexing the foreign keys made the SQL query much faster than before.',
      'Indexing the foreign keys made the SQL query more faster than before.',
      'Indexing the foreign keys made the SQL query very faster than before.',
      'Indexing the foreign keys made the SQL query by far faster that before.',
    ],
    correcta: 0,
    explicacion: 'To intensify a comparative adjective («faster»), we use modifiers like «much», «far», or «a lot» («much faster»), never «very» or «more».',
  },
];
