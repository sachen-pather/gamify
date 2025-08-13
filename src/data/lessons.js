// Complete lesson data for frontend-only app (all videos from Python FastAPI file)
export const lessons = {
  1: {
    id: 1,
    lesson_id: 1,
    stage: 1,
    title: "Introduction to Financial Literacy",
    video_url: "https://www.youtube.com/embed/q5JWp47z4bY?si=Cm181Y2sDK8vNq8g",
    summary:
      "Introduction to Financial Literacy: Learn about budgeting, saving, and managing personal finances.",
    duration: "15 min",
    objectives: [
      "Understand the importance of financial literacy",
      "Learn basic budgeting principles",
      "Identify income and expense categories",
      "Develop financial awareness",
    ],
    keyTerms: ["Budget", "Income", "Expenses", "Financial Planning"],
  },
  2: {
    id: 2,
    lesson_id: 2,
    stage: 2,
    title: "Understanding Money",
    video_url: "https://www.youtube.com/embed/MFO6OtnmEDo?si=B17ZOj_ppSyeGyfx",
    summary:
      "Understanding Money: Learn the basics of money management and the importance of financial literacy.",
    duration: "12 min",
    objectives: [
      "Understand the basic functions of money",
      "Learn about different forms of money",
      "Discover money's role in the economy",
      "Develop money awareness",
    ],
    keyTerms: ["Money", "Currency", "Exchange", "Value"],
  },
  3: {
    id: 3,
    lesson_id: 3,
    stage: 3,
    title: "Saving Basics",
    video_url: "https://www.youtube.com/embed/7ZfxVv4FC5o?si=RVC2Rk-YyYW-hQ24",
    summary:
      "Saving Basics: Learn why saving money is important and how to start building your savings.",
    duration: "14 min",
    objectives: [
      "Understand the importance of saving",
      "Learn different saving strategies",
      "Discover how to pay yourself first",
      "Set realistic saving goals",
    ],
    keyTerms: ["Savings", "Emergency Fund", "Goals", "Interest"],
  },
  4: {
    id: 4,
    lesson_id: 4,
    stage: 4,
    title: "Creating a Budget",
    video_url: "https://www.youtube.com/embed/-vVp185Sq24?si=q_d8vAs7Xk-4i7cU",
    summary:
      "Creating a Budget: Understand the importance of budgeting and learn how to create a budget.",
    duration: "16 min",
    objectives: [
      "Learn to create a personal budget",
      "Understand the 50/30/20 rule",
      "Track income and expenses",
      "Make informed spending decisions",
    ],
    keyTerms: [
      "Budget",
      "50/30/20 Rule",
      "Fixed Expenses",
      "Variable Expenses",
    ],
  },
  5: {
    id: 5,
    lesson_id: 5,
    stage: 5,
    title: "Advanced Budgeting",
    video_url: "https://www.youtube.com/embed/N2aODJWw7Xw?si=gCjuEorQPCZa5M0Z",
    summary:
      "Advanced Budgeting: Learn how to manage irregular expenses and track spending.",
    duration: "18 min",
    objectives: [
      "Manage irregular expenses",
      "Track and categorize spending",
      "Handle unexpected costs",
      "Optimize your budget over time",
    ],
    keyTerms: [
      "Fixed Expenses",
      "Variable Expenses",
      "Irregular Expenses",
      "Budget Optimization",
    ],
  },
  6: {
    id: 6,
    lesson_id: 6,
    stage: 6,
    title: "Introduction to Investing",
    video_url: "https://www.youtube.com/embed/qIw-yFC-HNU?si=c80kRDg2L069Z0wy",
    summary:
      "Introduction to Investing: Learn the basic concepts of investing, stocks, bonds, and risk.",
    duration: "20 min",
    objectives: [
      "Understand basic investment concepts",
      "Learn about different investment types",
      "Understand risk and return",
      "Explore stocks, bonds, and other assets",
    ],
    keyTerms: ["Investing", "Stocks", "Bonds", "Risk", "Return"],
  },
  7: {
    id: 7,
    lesson_id: 7,
    stage: 7,
    title: "Building an Investment Portfolio",
    video_url: "https://www.youtube.com/embed/bBSaiEq02Bc?si=tKb5UPpyNNXxaXS9",
    summary:
      "Building an Investment Portfolio: Learn how to diversify investments and understand risk management.",
    duration: "22 min",
    objectives: [
      "Learn portfolio diversification",
      "Understand risk management",
      "Create a balanced investment strategy",
      "Monitor and adjust your portfolio",
    ],
    keyTerms: [
      "Portfolio",
      "Diversification",
      "Asset Allocation",
      "Risk Management",
    ],
  },
};

// Quiz data matching your FastAPI backend questions and answers
export const quizzes = {
  1: {
    id: 1,
    lessonId: 1,
    question: "What is the main goal of budgeting?",
    options: [
      "To save money",
      "To plan spending",
      "To avoid taxes",
      "To earn interest",
    ],
    correctAnswer: "To plan spending",
    explanation:
      "Budgeting is primarily about planning how you will spend your money to ensure you can meet your needs and achieve your financial goals.",
  },
  2: {
    id: 2,
    lessonId: 2,
    question: "What is the primary function of money?",
    options: [
      "A store of value",
      "A means of exchange",
      "A unit of account",
      "All of the above",
    ],
    correctAnswer: "All of the above",
    explanation:
      "Money serves three primary functions: it's a store of value (saves purchasing power), a means of exchange (facilitates trade), and a unit of account (measures value).",
  },
  3: {
    id: 3,
    lessonId: 3,
    question: "Which of these is a good saving habit?",
    options: [
      "Living paycheck to paycheck",
      "Paying yourself first",
      "Spending more than you earn",
      "Ignoring your financial goals",
    ],
    correctAnswer: "Paying yourself first",
    explanation:
      "Paying yourself first means setting aside money for savings before paying other expenses. This ensures you consistently build your savings.",
  },
  4: {
    id: 4,
    lessonId: 4,
    question: "What is the 50/30/20 rule in budgeting?",
    options: [
      "50% for savings, 30% for needs, 20% for wants",
      "50% for needs, 30% for wants, 20% for savings",
      "50% for wants, 30% for savings, 20% for needs",
      "None of the above",
    ],
    correctAnswer: "50% for needs, 30% for wants, 20% for savings",
    explanation:
      "The 50/30/20 rule suggests allocating 50% of your income to needs (rent, utilities), 30% to wants (entertainment), and 20% to savings and debt repayment.",
  },
  5: {
    id: 5,
    lessonId: 5,
    question: "What is an example of a fixed expense?",
    options: ["Grocery bills", "Monthly rent", "Dining out", "Entertainment"],
    correctAnswer: "Monthly rent",
    explanation:
      "Fixed expenses are costs that remain the same each month. Monthly rent is a fixed expense because the amount doesn't change from month to month.",
  },
  6: {
    id: 6,
    lessonId: 6,
    question: "Which of the following is considered a safer investment?",
    options: ["Stocks", "Bonds", "Cryptocurrency", "Real Estate"],
    correctAnswer: "Bonds",
    explanation:
      "Bonds are generally considered safer than stocks because they provide fixed income and have lower volatility, though they typically offer lower returns.",
  },
  7: {
    id: 7,
    lessonId: 7,
    question: "What is diversification in investing?",
    options: [
      "Putting all your money in one stock",
      "Investing in multiple asset types to reduce risk",
      "Investing only in real estate",
      "None of the above",
    ],
    correctAnswer: "Investing in multiple asset types to reduce risk",
    explanation:
      "Diversification means spreading your investments across different asset types, sectors, and geographic regions to reduce overall portfolio risk.",
  },
};

// Course metadata
export const courseInfo = {
  title: "Financial Literacy Academy",
  description: "Master your money, secure your future",
  totalLessons: Object.keys(lessons).length,
  estimatedDuration: "117 minutes",
  difficulty: "Beginner to Intermediate",
  category: "Personal Finance",
};

// Learning objectives for the entire course
export const courseObjectives = [
  "Develop fundamental financial literacy skills",
  "Create and maintain a personal budget",
  "Build and manage savings effectively",
  "Understand basic investment principles",
  "Learn risk management strategies",
  "Make informed financial decisions",
  "Plan for long-term financial security",
];

// Course completion certificate data
export const certificateData = {
  title: "Financial Literacy Fundamentals",
  issuer: "Discovery Financial Academy",
  description:
    "Successfully completed comprehensive training in personal financial management",
  skills: [
    "Personal Budgeting",
    "Money Management",
    "Saving Strategies",
    "Investment Basics",
    "Risk Management",
    "Financial Planning",
  ],
};
