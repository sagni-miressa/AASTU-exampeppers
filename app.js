let isUnlocked = localStorage.getItem("aastu_access_unlocked") === "true";
let currentSemester = 1;
let searchQuery = "";

// Lightbox Gallery State
let currentGalleryItems = [];
let currentGalleryIndex = 0;
let currentGalleryCourse = "";

// AASTU Market Products Dataset
const marketProducts = [
  {
    name: "Earpod",
    icon: "🎧",
    description: "Wireless Bluetooth earpods with clear stereo sound, charging case, and long battery life."
  },
  {
    name: "Earphone",
    icon: "🎵",
    description: "Durable wired earphones with built-in microphone and crisp audio for study and calls."
  },
  {
    name: "Fast Charger",
    icon: "⚡",
    description: "High-speed wall fast charger compatible with Android & iPhone devices."
  },
  {
    name: "Charger Cables",
    icon: "🔌",
    description: "Strong fast-charging & data transfer cables (Type-C, Micro-USB, and Lightning)."
  },
  {
    name: "Adapters",
    icon: "🔋",
    description: "Reliable power adapters and OTG/audio converters built for daily campus use."
  }
];

// Course Dataset (All 256 Files Mapped & Sorted)
const courses = {
  1: [
    // 1. LOGIC & CRITICAL THINKING (LOG101)
    {
      name: "Logic & Critical Thinking",
      code: "LOG101",
      years: {
        "2016": [
          { title: "2016 Midterm - Page 1", file: "./exams/log101-2016-mid-p1.jpg" },
          { title: "2016 Midterm - Page 2", file: "./exams/log101-2016-mid-p2.jpg" },
          { title: "2016 Midterm - Page 3", file: "./exams/log101-2016-mid-p3.jpg" },
          { title: "2016 Midterm - Page 4", file: "./exams/log101-2016-mid-p4.jpg" },
          { title: "2016 Midterm - Page 6", file: "./exams/log101-2016-mid-p6.jpg" },
          { title: "2016 Midterm - Page 7", file: "./exams/log101-2016-mid-p7.jpg" },
          { title: "2016 Midterm - Page 8", file: "./exams/log101-2016-mid-p8.jpg" },
          { title: "2016 Midterm - Page 9", file: "./exams/log101-2016-mid-p9.jpg" }
        ],
        "2017": [
          { title: "2017 Midterm - Page 1", file: "./exams/log101-2017-mid-p1.jpg" },
          { title: "2017 Midterm - Page 2", file: "./exams/log101-2017-mid-p2.jpg" },
          { title: "2017 Midterm - Page 3", file: "./exams/log101-2017-mid-p3.jpg" },
          { title: "2017 Final - Page 1", file: "./exams/log101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/log101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/log101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/log101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/log101-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/log101-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/log101-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/log101-2017-final-p8.jpg" },
          { title: "2017 Final - Page 9", file: "./exams/log101-2017-final-p9.jpg" },
          { title: "2017 Final - Page 10", file: "./exams/log101-2017-final-p10.jpg" },
          { title: "2017 Final - Page 11", file: "./exams/log101-2017-final-p11.jpg" },
          { title: "2017 Final - Page 13", file: "./exams/log101-2017-final-p13.jpg" }
        ],
        "2018": [
          { title: "2018 Final - Page 1", file: "./exams/log101-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/log101-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/log101-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/log101-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/log101-2018-final-p5.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/log101-2018-final-p7.jpg" },
          { title: "2018 Final - Page 8", file: "./exams/log101-2018-final-p8.jpg" },
          { title: "2018 Final - Page 9", file: "./exams/log101-2018-final-p9.jpg" },
          { title: "2018 Final - Page 10", file: "./exams/log101-2018-final-p10.jpg" },
          { title: "2018 Final - Page 11", file: "./exams/log101-2018-final-p11.jpg" },
          { title: "2018 Final - Page 12", file: "./exams/log101-2018-final-p12.jpg" },
          { title: "2018 Final - Page 13", file: "./exams/log101-2018-final-p13.jpg" },
          { title: "2018 Final - Page 14", file: "./exams/log101-2018-final-p14.jpg" },
          { title: "2018 Final - Page 15", file: "./exams/log101-2018-final-p15.jpg" }
        ]
      }
    },

    // 2. GENERAL PSYCHOLOGY (PSY101)
    {
      name: "General Psychology",
      code: "PSY101",
      years: {
        "2016": [
          { title: "2016 Final - Page 1", file: "./exams/psy101-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/psy101-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/psy101-2016-final-p3.jpg" },
          { title: "2016 Final - Page 4", file: "./exams/psy101-2016-final-p4.jpg" },
          { title: "2016 Final - Page 6", file: "./exams/psy101-2016-final-p6.jpg" },
          { title: "2016 Final - Page 7", file: "./exams/psy101-2016-final-p7.jpg" },
          { title: "2016 Final - Page 8", file: "./exams/psy101-2016-final-p8.jpg" },
          { title: "2016 Final - Page 9", file: "./exams/psy101-2016-final-p9.jpg" },
          { title: "2016 Final - Page 10", file: "./exams/psy101-2016-final-p10.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/psy101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/psy101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/psy101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/psy101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/psy101-2017-final-p5.jpg" }
        ],
        "2018": [
          { title: "2018 Midterm - Page 1", file: "./exams/psy101-2018-mid-p1.jpg" },
          { title: "2018 Midterm - Page 2", file: "./exams/psy101-2018-mid-p2.jpg" },
          { title: "2018 Midterm - Page 3", file: "./exams/psy101-2018-mid-p3.jpg" },
          { title: "2018 Midterm - Page 4", file: "./exams/psy101-2018-mid-p4.jpg" }
        ]
      }
    },

    // 3. GENERAL MATHEMATICS (MATH100)
    {
      name: "General Mathematics",
      code: "MATH100",
      years: {
        "2016": [
          { title: "2016 Midterm - Page 1", file: "./exams/math100-2016-mid-p1.jpg" },
          { title: "2016 Midterm - Page 2", file: "./exams/math100-2016-mid-p2.jpg" },
          { title: "2016 Final - Page 1", file: "./exams/math100-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/math100-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/math100-2016-final-p3.jpg" },
          { title: "2016 Final - Page 9", file: "./exams/math100-2016-final-p9.jpg" },
          { title: "2016 Final - Page 10", file: "./exams/math100-2016-final-p10.jpg" },
          { title: "2016 Final - Page 11", file: "./exams/math100-2016-final-p11.jpg" },
          { title: "2016 Final - Page 12", file: "./exams/math100-2016-final-p12.jpg" },
          { title: "2016 Final - Page 13", file: "./exams/math100-2016-final-p13.jpg" },
          { title: "2016 Final - Page 14", file: "./exams/math100-2016-final-p14.jpg" },
          { title: "2016 Final - Page 15", file: "./exams/math100-2016-final-p15.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/math100-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/math100-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/math100-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/math100-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/math100-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/math100-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/math100-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/math100-2017-final-p8.jpg" },
          { title: "2017 Final - Page 9", file: "./exams/math100-2017-final-p9.jpg" },
          { title: "2017 Final - Page 10", file: "./exams/math100-2017-final-p10.jpg" },
          { title: "2017 Final - Page 11", file: "./exams/math100-2017-final-p11.jpg" },
          { title: "2017 Final - Page 12", file: "./exams/math100-2017-final-p12.jpg" },
          { title: "2017 Final - Page 13", file: "./exams/math100-2017-final-p13.jpg" },
          { title: "2017 Final - Page 14", file: "./exams/math100-2017-final-p14.jpg" },
          { title: "2017 Final - Page 15", file: "./exams/math100-2017-final-p15.jpg" },
          { title: "2017 Final - Page 16", file: "./exams/math100-2017-final-p16.jpg" },
          { title: "2017 Final - Page 17", file: "./exams/math100-2017-final-p17.jpg" },
          { title: "2017 Final - Page 18", file: "./exams/math100-2017-final-p18.jpg" },
          { title: "2017 Final - Page 19", file: "./exams/math100-2017-final-p19.jpg" }
        ],
        "2018": [
          { title: "2018 Midterm - PDF 1", file: "./exams/math100-2018-mid.pdf" },
          { title: "2018 Midterm - PDF 2", file: "./exams/math100-2018-mid2.pdf" },
          { title: "2018 Midterm - PDF 3", file: "./exams/math100-2018-mid3.pdf" },
          { title: "2018 Midterm - Page 1", file: "./exams/math100-2018-mid-p1.jpg" },
          { title: "2018 Midterm - Page 2", file: "./exams/math100-2018-mid-p2.jpg" },
          { title: "2018 Midterm - Page 3", file: "./exams/math100-2018-mid-p3.jpg" },
          { title: "2018 Midterm - Page 4", file: "./exams/math100-2018-mid-p4.jpg" },
          { title: "2018 Midterm - Page 6", file: "./exams/math100-2018-mid-p6.jpg" },
          { title: "2018 Midterm - Page 8", file: "./exams/math100-2018-mid-p8.jpg" },
          { title: "2018 Final - Page 1", file: "./exams/math100-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/math100-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/math100-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/math100-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/math100-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/math100-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/math100-2018-final-p7.jpg" },
          { title: "2018 Final - Page 9", file: "./exams/math100-2018-final-p9.jpg" },
          { title: "2018 Final - Page 10", file: "./exams/math100-2018-final-p10.jpg" },
          { title: "2018 Final - Page 11", file: "./exams/math100-2018-final-p11.jpg" },
          { title: "2018 Final - Page 12", file: "./exams/math100-2018-final-p12.jpg" },
          { title: "2018 Final - Page 13", file: "./exams/math100-2018-final-p13.jpg" },
          { title: "2018 Final - Page 20", file: "./exams/math100-2018-final-p20.jpg" },
          { title: "2018 Final - Page 21", file: "./exams/math100-2018-final-p21.jpg" },
          { title: "2018 Final - Page 22", file: "./exams/math100-2018-final-p22.jpg" }
        ]
      }
    },

    // 4. COMMUNICATIVE ENGLISH I (ENG101)
    {
      name: "Communicative English I",
      code: "ENG101",
      years: {
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/eng101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/eng101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/eng101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/eng101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/eng101-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/eng101-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/eng101-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/eng101-2017-final-p8.jpg" }
        ],
        "2018": [
          { title: "2018 Midterm - PDF", file: "./exams/eng101-2018-mid.pdf" },
          { title: "2018 Midterm - Page 1", file: "./exams/eng101-2018-mid-p1.jpg" },
          { title: "2018 Midterm - Page 2", file: "./exams/eng101-2018-mid-p2.jpg" },
          { title: "2018 Midterm - Page 3", file: "./exams/eng101-2018-mid-p3.jpg" },
          { title: "2018 Midterm - Page 4", file: "./exams/eng101-2018-mid-p4.jpg" },
          { title: "2018 Final - Page 1", file: "./exams/eng101-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/eng101-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/eng101-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/eng101-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/eng101-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/eng101-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/eng101-2018-final-p7.jpg" },
          { title: "2018 Final - Page 8", file: "./exams/eng101-2018-final-p8.jpg" },
          { title: "2018 Final - Page 10", file: "./exams/eng101-2018-final-p10.jpg" },
          { title: "2018 Final - Page 11", file: "./exams/eng101-2018-final-p11.jpg" },
          { title: "2018 Final - Page 12", file: "./exams/eng101-2018-final-p12.jpg" },
          { title: "2018 Final - Page 13", file: "./exams/eng101-2018-final-p13.jpg" },
          { title: "2018 Final - Page 14", file: "./exams/eng101-2018-final-p14.jpg" },
          { title: "2018 Final - Page 15", file: "./exams/eng101-2018-final-p15.jpg" },
          { title: "2018 Final - Page 16", file: "./exams/eng101-2018-final-p16.jpg" },
          { title: "2018 Final - Page 17", file: "./exams/eng101-2018-final-p17.jpg" },
          { title: "2018 Final - Page 18", file: "./exams/eng101-2018-final-p18.jpg" },
          { title: "2018 Final - Page 19", file: "./exams/eng101-2018-final-p19.jpg" }
        ]
      }
    },

    // 5. GENERAL PHYSICS (PHYS101)
    {
      name: "General Physics",
      code: "PHYS101",
      years: {
        "2016": [
          { title: "2016 Final - Page 1", file: "./exams/phys101-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/phys101-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/phys101-2016-final-p3.jpg" },
          { title: "2016 Final - Page 4", file: "./exams/phys101-2016-final-p4.jpg" },
          { title: "2016 Final - Page 5", file: "./exams/phys101-2016-final-p5.jpg" },
          { title: "2016 Final - Page 6", file: "./exams/phys101-2016-final-p6.jpg" },
          { title: "2016 Final - Page 7", file: "./exams/phys101-2016-final-p7.jpg" },
          { title: "2016 Final - Page 8", file: "./exams/phys101-2016-final-p8.jpg" },
          { title: "2016 Final - Page 10", file: "./exams/phys101-2016-final-p10.jpg" },
          { title: "2016 Final - Page 11", file: "./exams/phys101-2016-final-p11.jpg" },
          { title: "2016 Final - Page 12", file: "./exams/phys101-2016-final-p12.jpg" },
          { title: "2016 Final - Page 13", file: "./exams/phys101-2016-final-p13.jpg" }
        ],
        "2017": [
          { title: "2017 Midterm - PDF 1", file: "./exams/phys101-2017-mid.pdf" },
          { title: "2017 Midterm - PDF 2", file: "./exams/phys101-2017-mid3.pdf" },
          { title: "2017 Midterm - Page 1", file: "./exams/phys101-2017-mid-p1.jpg" },
          { title: "2017 Midterm - Page 2", file: "./exams/phys101-2017-mid-p2.jpg" },
          { title: "2017 Midterm - Page 4", file: "./exams/phys101-2017-mid-p4.jpg" },
          { title: "2017 Midterm - Page 5", file: "./exams/phys101-2017-mid-p5.jpg" },
          { title: "2017 Midterm - Page 6", file: "./exams/phys101-2017-mid-p6.jpg" },
          { title: "2017 Midterm - Page 7", file: "./exams/phys101-2017-mid-p7.jpg" },
          { title: "2017 Midterm - Page 8", file: "./exams/phys101-2017-mid-p8.jpg" },
          { title: "2017 Final - Page 1", file: "./exams/phys101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/phys101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/phys101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/phys101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/phys101-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/phys101-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/phys101-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/phys101-2017-final-p8.jpg" },
          { title: "2017 Final - Page 9", file: "./exams/phys101-2017-final-p9.jpg" },
          { title: "2017 Final - Page 10", file: "./exams/phys101-2017-final-p10.jpg" },
          { title: "2017 Final - Page 12", file: "./exams/phys101-2017-final-p12.jpg" },
          { title: "2017 Final - Page 14", file: "./exams/phys101-2017-final-p14.jpg" },
          { title: "2017 Final - Page 15", file: "./exams/phys101-2017-final-p15.jpg" },
          { title: "2017 Final - Page 16", file: "./exams/phys101-2017-final-p16.jpg" },
          { title: "2017 Final - Page 17", file: "./exams/phys101-2017-final-p17.jpg" },
          { title: "2017 Final - Page 18", file: "./exams/phys101-2017-final-p18.jpg" },
          { title: "2017 Final - Page 19", file: "./exams/phys101-2017-final-p19.jpg" },
          { title: "2017 Final - Page 23", file: "./exams/phys101-2017-final-p23.jpg" },
          { title: "2017 Final - Page 24", file: "./exams/phys101-2017-final-p24.jpg" },
          { title: "2017 Final - Page 25", file: "./exams/phys101-2017-final-p25.jpg" },
          { title: "2017 Final - Page 26", file: "./exams/phys101-2017-final-p26.jpg" },
          { title: "2017 Final - Page 27", file: "./exams/phys101-2017-final-p27.jpg" },
          { title: "2017 Final - Page 29", file: "./exams/phys101-2017-final-p29.jpg" },
          { title: "2017 Final - Extra 1", file: "./exams/phys101-2017-final-p122.jpg" },
          { title: "2017 Final - Extra 2", file: "./exams/phys101-2017-final-p134.jpg" },
          { title: "2017 Final - Extra 3", file: "./exams/phys101-2017-final-p191.jpg" }
        ],
        "2018": [
          { title: "2018 Midterm - PDF 1", file: "./exams/phys101-2018-mid.pdf" },
          { title: "2018 Midterm - PDF 2", file: "./exams/phys101-2018-mid2.pdf" },
          { title: "2018 Midterm - PDF 3", file: "./exams/phys101-2018-mid 3.pdf" },
          { title: "2018 Midterm - Page 1", file: "./exams/phys101-2018-mid-p1.jpg" },
          { title: "2018 Midterm - Page 2", file: "./exams/phys101-2018-mid-p2.jpg" },
          { title: "2018 Midterm - Page 3", file: "./exams/phys101-2018-mid-p3.jpg" },
          { title: "2018 Midterm - Page 4", file: "./exams/phys101-2018-mid-p4.jpg" },
          { title: "2018 Midterm - Page 5", file: "./exams/phys101-2018-mid-p5.jpg" },
          { title: "2018 Midterm - Page 10", file: "./exams/phys101-2018-mid-p10.jpg" },
          { title: "2018 Midterm - Page 11", file: "./exams/phys101-2018-mid-p11.jpg" },
          { title: "2018 Midterm - Page 12", file: "./exams/phys101-2018-mid-p12.jpg" },
          { title: "2018 Midterm - Page 13", file: "./exams/phys101-2018-mid-p13.jpg" },
          { title: "2018 Midterm - Page 14", file: "./exams/phys101-2018-mid-p14.jpg" },
          { title: "2018 Midterm - Page 15", file: "./exams/phys101-2018-mid-p15.jpg" },
          { title: "2018 Midterm - Page 16", file: "./exams/phys101-2018-mid-p16.jpg" },
          { title: "2018 Midterm - Page 17", file: "./exams/phys101-2018-mid-p17.jpg" },
          { title: "2018 Midterm - Page 18", file: "./exams/phys101-2018-mid-p18.jpg" },
          { title: "2018 Midterm - Page 19", file: "./exams/phys101-2018-mid-p19.jpg" },
          { title: "2018 Midterm - Page 20", file: "./exams/phys101-2018-mid-p20.jpg" },
          { title: "2018 Midterm - Page 21", file: "./exams/phys101-2018-mid-p21.jpg" },
          { title: "2018 Midterm - Page 22", file: "./exams/phys101-2018-mid-p22.jpg" },
          { title: "2018 Midterm - Page 24", file: "./exams/phys101-2018-mid-p24.jpg" },
          { title: "2018 Midterm - Page 25", file: "./exams/phys101-2018-mid-p25.jpg" },
          { title: "2018 Midterm - Page 26", file: "./exams/phys101-2018-mid-p26.jpg" },
          { title: "2018 Midterm - Page 27", file: "./exams/phys101-2018-mid-p27.jpg" },
          { title: "2018 Midterm - Page 28", file: "./exams/phys101-2018-mid-p28.jpg" },
          { title: "2018 Midterm - Page 29", file: "./exams/phys101-2018-mid-p29.jpg" },
          { title: "2018 Midterm - Page 30", file: "./exams/phys101-2018-mid-p30.jpg" },
          { title: "2018 Final - Page 1", file: "./exams/phys101-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/phys101-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/phys101-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/phys101-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/phys101-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/phys101-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/phys101-2018-final-p7.jpg" },
          { title: "2018 Final - Page 8", file: "./exams/phys101-2018-final-p8.jpg" },
          { title: "2018 Final - Page 9", file: "./exams/phys101-2018-final-p9.jpg" },
          { title: "2018 Final - Page 10", file: "./exams/phys101-2018-final-p10.jpg" },
          { title: "2018 Final - Page 11", file: "./exams/phys101-2018-final-p11.jpg" },
          { title: "2018 Final - Page 12", file: "./exams/phys101-2018-final-p12.jpg" },
          { title: "2018 Final - Page 13", file: "./exams/phys101-2018-final-p13.jpg" },
          { title: "2018 Final - Page 14", file: "./exams/phys101-2018-final-p14.jpg" },
          { title: "2018 Final - Page 15", file: "./exams/phys101-2018-final-p15.jpg" },
          { title: "2018 Final - Page 16", file: "./exams/phys101-2018-final-p16.jpg" },
          { title: "2018 Final - Page 17", file: "./exams/phys101-2018-final-p17.jpg" },
          { title: "2018 Final - Page 19", file: "./exams/phys101-2018-final-p19.jpg" },
          { title: "2018 Final - Page 20", file: "./exams/phys101-2018-final-p20.jpg" },
          { title: "2018 Final - Page 21", file: "./exams/phys101-2018-final-p21.jpg" },
          { title: "2018 Final - Page 22", file: "./exams/phys101-2018-final-p22.jpg" },
          { title: "2018 Final - Page 23", file: "./exams/phys101-2018-final-p23.jpg" },
          { title: "2018 Final - Page 24", file: "./exams/phys101-2018-final-24.jpg" },
          { title: "2018 Final - Page 25", file: "./exams/phys101-2018-final-p25.jpg" },
          { title: "2018 Final - Page 26", file: "./exams/phys101-2018-final-p26.jpg" },
          { title: "2018 Final - Page 27", file: "./exams/phys101-2018-final-p27.jpg" }
        ]
      }
    },

    // 6. HISTORY OF ETHIOPIA & THE HORN (HIST101)
    {
      name: "History of Ethiopia & the Horn",
      code: "HIST101",
      years: {
        "2016": [
          { title: "2016 Midterm - Page 1", file: "./exams/hist101-2016-mid-p1.jpg" },
          { title: "2016 Midterm - Page 2", file: "./exams/hist101-2016-mid-p2.jpg" },
          { title: "2016 Midterm - Page 3", file: "./exams/hist101-2016-mid-p3.jpg" },
          { title: "2016 Midterm - Page 4", file: "./exams/hist101-2016-mid-p4.jpg" },
          { title: "2016 Midterm - Page 5", file: "./exams/hist101-2016-mid-p5.jpg" },
          { title: "2016 Midterm - Page 6", file: "./exams/hist101-2016-mid-p6.jpg" },
          { title: "2016 Midterm - Page 7", file: "./exams/hist101-2016-mid-p7.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/hist101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/hist101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/hist101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/hist101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/hist101-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/hist101-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/hist101-2017-final-p7.jpg" }
        ]
      }
    },

    // 7. GEOGRAPHY OF ETHIOPIA & THE HORN (GEOG101)
    {
      name: "Geography of Ethiopia & the Horn",
      code: "GEOG101",
      years: {
        "2017": [
          { title: "2017 Final - PDF 1", file: "./exams/geog101-2017-final.pdf" },
          { title: "2017 Final - PDF 2", file: "./exams/geog101-2017-final2.pdf" },
          { title: "2017 Final - PDF 3", file: "./exams/geog101-2017-final3.pdf" }
        ],
        "2018": [
          { title: "2018 Final - Page 1", file: "./exams/geog101-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/geog101-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/geog101-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/geog101-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/geog101-2018-final-p5.jpg" }
        ]
      }
    }
  ],

  2: [
    // 1. SOCIAL ANTHROPOLOGY (ANT102)
    {
      name: "Social Anthropology",
      code: "ANT102",
      years: {
        "2016": [
          { title: "2016 Final - Page 1", file: "./exams/ant102-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/ant102-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/ant102-2016-final-p3.jpg" },
          { title: "2016 Final - Page 5", file: "./exams/ant102-2016-final-p5.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/ant102-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/ant102-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/ant102-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/ant102-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/ant102-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/ant102-2017-final-p6.jpg" }
        ]
      }
    },

    // 2. ENTREPRENEURSHIP (ENT102)
    {
      name: "Entrepreneurship",
      code: "ENT102",
      years: {
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/ent102-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/ent102-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/ent102-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/ent102-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/ent102-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/ent102-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/ent102-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/ent102-2017-final-p8.jpg" },
          { title: "2017 Final - Page 9", file: "./exams/ent102-2017-final-p9.jpg" }
        ],
        "2018": [
          { title: "2018 Midterm - PDF 1", file: "./exams/ent102-2018-mid.pdf" },
          { title: "2018 Midterm - PDF 2", file: "./exams/ent102-2018-mid2.pdf" },
          { title: "2018 Final - Page 1", file: "./exams/ent102-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/ent102-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/ent102-2018-final-p3.jpgv.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/ent102-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/ent102-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/ent102-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/ent102-2018-final-p7.jpg" },
          { title: "2018 Final - Page 8", file: "./exams/ent102-2018-final-p8.jpg" },
          { title: "2018 Final - Page 9", file: "./exams/ent102-2018-final-p9.jpg" },
          { title: "2018 Final - Page 10", file: "./exams/ent102-2018-final-p10.jpg" },
          { title: "2018 Final - Page 11", file: "./exams/ent102-2018-final-p11.jpg" }
        ]
      }
    },

    // 3. APPLIED MATHEMATICS I (MATH102)
    {
      name: "Applied Mathematics I",
      code: "MATH102",
      years: {
        "2017": [
          { title: "2017 Midterm - Page 1", file: "./exams/math102-2017-mid-p1.jpg" },
          { title: "2017 Midterm - Page 2", file: "./exams/math102-2017-mid-p2.jpg" },
          { title: "2017 Midterm - Page 3", file: "./exams/math102-2017-mid-p3.jpg" },
          { title: "2017 Final - Page 1", file: "./exams/math102-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/math102-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/math102-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/math102-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/math102-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/math102-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/math102-2017-final-p7.jpg" }
        ],
        "2018": [
          { title: "2018 Final - Page 1", file: "./exams/math102-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/math102-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/math102-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/math102-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/math102-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/math102-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/math102-2018-final-p7.jpg" },
          { title: "2018 Final - Page 8", file: "./exams/math102-2018-final-p8.jpg" },
          { title: "2018 Final - Page 9", file: "./exams/math102-2018-final-p9.jpg" }
        ]
      }
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  if (isUnlocked) {
    applyUnlockedUI();
  }

  renderCourses();
  renderMarket();

  const unlockBtn = document.getElementById("unlockBtn");
  if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
      document.getElementById("paymentModal").classList.remove("hidden");
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase();
      renderCourses();
    });
  }

  // Anti-Capture Security Restrictions
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  document.addEventListener("keyup", (e) => {
    if (e.key === "PrintScreen") {
      triggerBlackout(3000);
    }
  });

  document.addEventListener("keydown", (e) => {
    const isViewerOpen = !document.getElementById("viewerModal").classList.contains("hidden");
    if (isViewerOpen) {
      if (e.key === "ArrowRight") changeExamPage(1);
      if (e.key === "ArrowLeft") changeExamPage(-1);
      if (e.key === "Escape") closeExamViewer();
    }

    const isMacShot = e.metaKey && e.shiftKey && ["3", "4", "5", "s", "S"].includes(e.key);
    const isWinSnip = (e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "s" || e.key === "S");
    const isBlockedShortcut =
      e.key === "PrintScreen" ||
      isMacShot ||
      isWinSnip ||
      (e.ctrlKey && ["p", "P", "s", "S", "u", "U"].includes(e.key)) ||
      (e.ctrlKey && e.shiftKey && ["I", "i", "C", "c", "J", "j"].includes(e.key)) ||
      e.key === "F12";

    if (isBlockedShortcut) {
      e.preventDefault();
      triggerBlackout(3000);
    }
  });

  window.addEventListener("blur", () => {
    const shield = document.getElementById("securityBlackout");
    if (shield) shield.classList.remove("hidden");
  });

  window.addEventListener("focus", () => {
    const shield = document.getElementById("securityBlackout");
    if (shield) shield.classList.add("hidden");
  });
});

function triggerBlackout(durationMs = 2500) {
  const shield = document.getElementById("securityBlackout");
  if (!shield) return;
  shield.classList.remove("hidden");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText("").catch(() => {});
  }
  setTimeout(() => {
    if (document.hasFocus()) {
      shield.classList.add("hidden");
    }
  }, durationMs);
}

function applyUnlockedUI() {
  const badge = document.getElementById("accessBadge");
  if (badge) {
    badge.className = "status-badge unlocked";
    badge.innerText = "UNLOCKED";
  }
  const unlockBtn = document.getElementById("unlockBtn");
  if (unlockBtn) {
    unlockBtn.style.display = "none";
  }
}

function enterPortalSection(pageName) {
  showPage(pageName);
  const targetNav = pageName === "home" ? document.getElementById("navExamsBtn") : document.getElementById("navMarketBtn");
  if (targetNav) {
    document.querySelectorAll(".nav-bubble").forEach(btn => btn.classList.remove("active"));
    targetNav.classList.add("active");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showPage(pageName, event) {
  const welcomePage = document.getElementById("welcomePage");
  const mainNavbar = document.getElementById("mainNavbar");
  const mainContainer = document.getElementById("mainContainer");
  const assistantWidget = document.getElementById("assistantWidget");

  document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));
  document.querySelectorAll(".nav-bubble").forEach(btn => btn.classList.remove("active"));

  if (pageName === "welcome") {
    document.body.classList.add("welcome-mode");
    welcomePage.classList.remove("hidden");
    mainNavbar.classList.add("hidden");
    mainContainer.classList.add("hidden");
    assistantWidget.classList.add("hidden");
    return;
  }

  document.body.classList.remove("welcome-mode");
  welcomePage.classList.add("hidden");
  mainNavbar.classList.remove("hidden");
  mainContainer.classList.remove("hidden");
  assistantWidget.classList.remove("hidden");

  if (pageName === "home") {
    document.getElementById("homePage").classList.remove("hidden");
  } else if (pageName === "market") {
    document.getElementById("marketPage").classList.remove("hidden");
  } else if (pageName === "about") {
    document.getElementById("aboutPage").classList.remove("hidden");
  } else if (pageName === "contact") {
    document.getElementById("contactPage").classList.remove("hidden");
  }

  if (event && event.target) {
    event.target.classList.add("active");
  }
}

/* =========================================
   AASTU MARKET RENDERING & ORDER MODAL
   ========================================= */
function renderMarket() {
  const grid = document.getElementById("marketGrid");
  if (!grid) return;

  grid.innerHTML = marketProducts.map((item, idx) => `
    <div class="market-card" onclick="openMarketOrder(${idx})">
      <div>
        <div class="market-card-top">
          <div class="market-item-icon">${item.icon}</div>
          <h4>${item.name}</h4>
        </div>
        <p style="margin-top: 10px;">${item.description}</p>
      </div>
      <button class="market-order-btn">Order ${item.name}</button>
    </div>
  `).join("");
}

function openMarketOrder(index) {
  const item = marketProducts[index];
  if (!item) return;

  document.getElementById("orderItemTitle").innerText = `Order: ${item.name}`;
  document.getElementById("orderItemDesc").innerText = `Call 0944899465 or message @samirgob on Telegram to order your ${item.name}.`;

  const msg = encodeURIComponent(`Hello @samirgob, I want to order ${item.name} from AASTU Market.`);
  document.getElementById("orderTelegramLink").href = `https://t.me/samirgob?text=${msg}`;

  document.getElementById("marketOrderModal").classList.remove("hidden");
}

/* =========================================
   FRESH EXAMS RENDERING & GALLERY VIEWER
   ========================================= */
function switchSemester(sem) {
  currentSemester = sem;
  document.getElementById("sem1Btn").classList.toggle("active", sem === 1);
  document.getElementById("sem2Btn").classList.toggle("active", sem === 2);
  renderCourses();
}

function renderCourses() {
  const grid = document.getElementById("courseGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = courses[currentSemester].filter(c =>
    c.name.toLowerCase().includes(searchQuery) || c.code.toLowerCase().includes(searchQuery)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No courses found matching "${searchQuery}".</p>`;
    return;
  }

  filtered.forEach((course, courseIdx) => {
    const card = document.createElement("div");
    card.className = "course-card";

    let yearsHTML = "";
    Object.keys(course.years).forEach(yr => {
      const papers = course.years[yr];
      const yearContainerId = `yr-${courseIdx}-${yr}`;

      const groups = {};
      papers.forEach(p => {
        const match = p.title.match(/(Midterm|Final)/i);
        const groupName = match ? `${yr} ${match[1]} Exam` : `${yr} Exam Papers`;
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(p);
      });

      const subgroupsHTML = Object.entries(groups).map(([groupName, groupItems], gIdx) => {
        const subId = `${yearContainerId}-sub-${gIdx}`;
        const encodedCourse = encodeURIComponent(course.name);
        const encodedList = encodeURIComponent(JSON.stringify(groupItems));

        const countLabel = isUnlocked
          ? ` (${groupItems.length} ${groupItems.length === 1 ? "File" : "Pages"})`
          : "";

        const rightIndicator = isUnlocked
          ? `<span>▼</span>`
          : `<span class="locked-pill">Unlock to View</span>`;

        const galleryCardsHTML = isUnlocked
          ? groupItems.map((p, idx) => {
              const isPdf = p.file.toLowerCase().endsWith(".pdf");
              const pageLabel = p.title.replace(/^.*-\s*/, "");
              return `
                <div class="gallery-card" onclick="openGalleryViewer('${encodedCourse}', '${encodedList}', ${idx})">
                  <div class="gallery-thumb-wrap">
                    ${
                      isPdf
                        ? `<span class="gallery-pdf-badge">PDF</span>`
                        : `<img src="${p.file}" alt="${p.title}" loading="lazy" />`
                    }
                  </div>
                  <div class="gallery-caption">${pageLabel}</div>
                </div>
              `;
            }).join("")
          : "";

        return `
          <div class="exam-subgroup">
            <div class="subgroup-header" onclick="handleSubgroupClick('${subId}')">
              <span>${groupName}${countLabel}</span>
              ${rightIndicator}
            </div>
            ${
              isUnlocked
                ? `<div id="${subId}" class="gallery-grid hidden">${galleryCardsHTML}</div>`
                : ""
            }
          </div>
        `;
      }).join("");

      yearsHTML += `
        <div class="year-group">
          <div class="year-header" onclick="toggleYearGroup('${yearContainerId}')">
            <span>${yr} Academic Year</span>
            <span>▼</span>
          </div>
          <div id="${yearContainerId}" class="year-papers hidden">
            ${subgroupsHTML}
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <h4>${course.name}</h4>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 10px;">Course Code: ${course.code}</p>
      ${yearsHTML}
    `;

    grid.appendChild(card);
  });
}

function handleSubgroupClick(subId) {
  if (!isUnlocked) {
    document.getElementById("paymentModal").classList.remove("hidden");
    return;
  }
  toggleYearGroup(subId);
}

function toggleYearGroup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("hidden");
}

function openGalleryViewer(encodedCourse, encodedList, startIndex) {
  if (!isUnlocked) {
    document.getElementById("paymentModal").classList.remove("hidden");
    return;
  }

  currentGalleryCourse = decodeURIComponent(encodedCourse);
  currentGalleryItems = JSON.parse(decodeURIComponent(encodedList));
  currentGalleryIndex = startIndex;

  const modal = document.getElementById("viewerModal");
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderViewerPage();
}

function renderViewerPage() {
  const item = currentGalleryItems[currentGalleryIndex];
  if (!item) return;

  document.getElementById("viewerTitle").innerText = `${currentGalleryCourse} - ${item.title}`;
  document.getElementById("viewerCounter").innerText = `${currentGalleryIndex + 1} / ${currentGalleryItems.length}`;
  document.getElementById("prevPageBtn").disabled = currentGalleryIndex === 0;
  document.getElementById("nextPageBtn").disabled = currentGalleryIndex === currentGalleryItems.length - 1;

  const body = document.getElementById("viewerBody");
  const isPdf = item.file.toLowerCase().endsWith(".pdf");

  const mediaHTML = isPdf
    ? `<iframe src="${item.file}#toolbar=0&navpanes=0&scrollbar=0"></iframe>`
    : `<img src="${item.file}" alt="${item.title}" draggable="false" />`;

  body.innerHTML = `
    <div class="pdf-watermark-overlay">
      <div class="pdf-watermark-text">
        AASTU EXAM PEPPERS<br>
        PROPRIETARY COPY - DO NOT DISTRIBUTE
      </div>
    </div>
    ${mediaHTML}
  `;
}

function changeExamPage(delta) {
  const nextIndex = currentGalleryIndex + delta;
  if (nextIndex >= 0 && nextIndex < currentGalleryItems.length) {
    currentGalleryIndex = nextIndex;
    renderViewerPage();
  }
}

function closeExamViewer() {
  document.getElementById("viewerModal").classList.add("hidden");
  document.body.style.overflow = "";
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

/* Floating Assistant Logic */
function toggleAssistant() {
  const windowEl = document.getElementById("assistantWindow");
  if (windowEl) {
    windowEl.classList.toggle("hidden");
  }
}

function handleAssistantKeyPress(e) {
  if (e.key === "Enter") sendAssistantMessage();
}

function sendQuickPrompt(text) {
  document.getElementById("assistantInput").value = text;
  sendAssistantMessage();
}

function sendAssistantMessage() {
  const input = document.getElementById("assistantInput");
  const text = input.value.trim();
  if (!text) return;

  appendChatMsg(text, "user");
  input.value = "";

  setTimeout(() => {
    let reply = "I am here to assist with Fresh Exams or AASTU Market orders. Ask about payments, accessories, or owner contacts.";
    const lower = text.toLowerCase();

    if (lower.includes("buy") || lower.includes("pay") || lower.includes("access")) {
      reply = "To unlock Fresh Exams:\n1. Transfer 100 ETB to CBE (1000654224057 - Sagni Miressa) or Telebirr (0944899465).\n2. Send your payment screenshot to @samirgob on Telegram!";
    } else if (lower.includes("market") || lower.includes("earpod") || lower.includes("charger") || lower.includes("adapter")) {
      reply = "AASTU Market sells Earpods, Earphones, Fast Chargers, Charger Cables, and Adapters. Call 0944899465 or message @samirgob on Telegram to order!";
    } else if (lower.includes("owner") || lower.includes("contact") || lower.includes("sagni")) {
      reply = "Portal administrator: Sagni Miressa. Contact via Telegram @samirgob or phone 0944899465.";
    }
    appendChatMsg(reply, "bot");
  }, 350);
}

function appendChatMsg(text, sender) {
  const container = document.getElementById("assistantMessages");
  if (!container) return;
  const msg = document.createElement("div");
  msg.className = `chat-bubble ${sender}`;
  msg.innerText = text;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}