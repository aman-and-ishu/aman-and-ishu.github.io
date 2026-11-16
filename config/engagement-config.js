/**
 * SINGLE SOURCE OF TRUTH — AMAN & ISHU ENGAGEMENT CEREMONY SUITE
 * Powers the interactive Engagement website (index.html) and the 1-page
 * clickable smartphone PDF invitation (invite-card.html -> dist/*.pdf).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ENGAGEMENT_CONFIG = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return {
    meta: {
      title: "Aman & Ishu — Our Engagement Ceremony Invitation | 30th Nov 2026",
      description:
        "Together with our families (the Singh & Gera families), we cordially invite you to our Engagement Ceremony on Monday, 30th November 2026 at 11:00 AM onwards at Paark Royal, Sector 21D, Faridabad.",
      websiteUrl: "https://aman-and-ishu.github.io/",
      pdfFileName: "Aman_and_Ishu_Engagement_Invite.pdf",
      pdfRelativePath: "dist/Aman_and_Ishu_Engagement_Invite.pdf"
    },

    invocation: {
      hindi: "॥ श्री गणेशाय नमः ॥",
      epigraph: "Two hearts… One beautiful beginning…"
    },

    couple: {
      monogram: "A & I",
      displayTitle: "Aman & Ishu",
      hashtag: "#AmanAndIshuForever",
      caricatureImage: "assets/couple-caricature.jpg",
      caricatureAlt:
        "Bespoke watercolor engagement caricature of Aman and Ishu beneath a sunlit white jasmine, porcelain-blue hydrangea, and olive arch",
      groom: {
        firstName: "Aman",
        fullName: "Aman",
        father: "Mr. Dhara Singh",
        mother: "Mrs. Madhuri",
        parentageLong: "Son of Mr. Dhara Singh & Mrs. Madhuri",
        parentageShort: "S/o Mr. Dhara Singh & Mrs. Madhuri"
      },
      bride: {
        firstName: "Ishu",
        fullName: "Ishu",
        father: "Mr. Dilip Gera",
        mother: "Mrs. Ritu Gera",
        parentageLong: "Daughter of Mr. Dilip Gera & Mrs. Ritu Gera",
        parentageShort: "D/o Mr. Dilip Gera & Mrs. Ritu Gera"
      }
    },

    event: {
      occasionBadge: "Our Engagement Ceremony",
      occasionTitle: "Engagement Ceremony",
      inviteProclamation:
        "Together with our families, we cordially invite you to celebrate our Engagement Ceremony. Your presence will make our joy more complete and our celebration truly special.",
      closingNote: "We look forward to celebrating this special occasion with you.",
      dateDisplay: "Monday, 30th November 2026",
      dateShort: "30th November 2026",
      dayOfWeek: "Monday",
      dayNumber: "30",
      monthName: "November",
      yearNumber: "2026",
      timeDisplay: "11:00 AM Onwards",
      timeShort: "11:00 AM",
      isoStart: "2026-11-30T11:00:00+05:30",
      isoEnd: "2026-11-30T15:30:00+05:30",
      icsStartUtc: "20261130T053000Z",
      icsEndUtc: "20261130T100000Z"
    },

    venue: {
      name: "Paark Royal",
      city: "Faridabad",
      fullTitle: "Paark Royal, Faridabad",
      addressLine1: "G Block, Next to Gas Agency, Opposite Sarkari Petrol Pump",
      addressLine2: "Sanjay Gandhi Memorial Nagar, Sector 21D, Faridabad, Haryana 121012",
      metroNote: "Nearest Metro Station — Badkhal Mor",
      mapUrl: "https://maps.app.goo.gl/xLdzunZ6RtFFszkr5?g_st=aw",
      illustration: "assets/paark-royal-daylight.jpg",
      illustrationAlt:
        "Sunlit morning architectural watercolor illustration of Paark Royal glasshouse pavilion and garden lawn in Faridabad"
    },

    rsvp: {
      complimentsFrom: "With Best Compliments From Our Families · The Singh & Gera Families",
      contacts: [
        {
          name: "Mr. Manoj Singh",
          phoneDisplay: "+91 82879 60420",
          phoneTel: "+918287960420"
        },
        {
          name: "Mr. Raj Singh",
          phoneDisplay: "+91 85100 25521",
          phoneTel: "+918510025521"
        }
      ]
    }
  };
});
