import { Vaccine } from '../types/health';

export const vaccines: Vaccine[] = [
  {
    id: 'covid19',
    name: 'COVID-19 Vaccine',
    ageGroups: ['12-17 years', '18-44 years', '45-59 years', '60+ years'],
    schedule: '2 doses with 28-84 days gap + booster after 6 months',
    description: 'Protects against COVID-19 and its variants. Essential for community immunity.',
    sideEffects: ['Pain at injection site', 'Mild fever', 'Fatigue', 'Headache', 'Body aches'],
    contraindications: ['Severe allergic reaction to previous dose', 'Active COVID-19 infection', 'Severe illness with fever'],
    translations: {
      hindi: {
        name: 'कोविड-19 वैक्सीन',
        description: 'कोविड-19 और इसके वेरिएंट से सुरक्षा प्रदान करता है। सामुदायिक प्रतिरक्षा के लिए आवश्यक।',
        sideEffects: ['इंजेक्शन स्थल पर दर्द', 'हल्का बुखार', 'थकान', 'सिरदर्द', 'शरीर में दर्द'],
        contraindications: ['पिछली डोज से गंभीर एलर्जी', 'सक्रिय कोविड-19 संक्रमण', 'बुखार के साथ गंभीर बीमारी']
      },
      odia: {
        name: 'କୋଭିଡ-୧୯ ଟିକା',
        description: 'କୋଭିଡ-୧୯ ଏବଂ ଏହାର ରୂପାନ୍ତରରୁ ସୁରକ୍ଷା ପ୍ରଦାନ କରେ। ସାମୁଦାୟିକ ପ୍ରତିରୋଧ ପାଇଁ ଆବଶ୍ୟକ।',
        sideEffects: ['ଇଞ୍ଜେକସନ ସ୍ଥାନରେ ଯନ୍ତ୍ରଣା', 'ସାମାନ୍ୟ ଜ୍ୱର', 'ଥକ୍କା', 'ମୁଣ୍ଡ ବିନ୍ଧା', 'ଶରୀରବିନ୍ଧା'],
        contraindications: ['ପୂର୍ବ ଡୋଜରୁ ଗୁରୁତର ଆଲର୍ଜି', 'ସକ୍ରିୟ କୋଭିଡ-୧୯ ସଂକ୍ରମଣ', 'ଜ୍ୱର ସହିତ ଗମ୍ଭୀର ରୋଗ']
      }
    }
  },
  {
    id: 'hepatitisb',
    name: 'Hepatitis B Vaccine',
    ageGroups: ['Birth', '1-2 months', '6 months', 'Adults at risk'],
    schedule: '3 doses at 0, 1-2, and 6 months',
    description: 'Prevents hepatitis B infection which can cause liver damage and cancer.',
    sideEffects: ['Soreness at injection site', 'Low grade fever', 'Fatigue'],
    contraindications: ['Severe illness with fever', 'Known allergy to vaccine components'],
    translations: {
      hindi: {
        name: 'हेपेटाइटिस बी वैक्सीन',
        description: 'हेपेटाइटिस बी संक्रमण को रोकता है जो लिवर को नुकसान और कैंसर का कारण बन सकता है।',
        sideEffects: ['इंजेक्शन स्थल पर दर्द', 'हल्का बुखार', 'थकान'],
        contraindications: ['बुखार के साथ गंभीर बीमारी', 'वैक्सीन घटकों से ज्ञात एलर्जी']
      },
      odia: {
        name: 'ହେପାଟାଇଟିସ ବି ଟିକା',
        description: 'ହେପାଟାଇଟିସ ବି ସଂକ୍ରମଣକୁ ରୋକେ ଯାହା ଲିଭର କ୍ଷତି ଏବଂ କର୍କଟ ରୋଗର କାରଣ ହୋଇପାରେ।',
        sideEffects: ['ଇଞ୍ଜେକସନ ସ୍ଥାନରେ ଯନ୍ତ୍ରଣା', 'ସାମାନ୍ୟ ଜ୍ୱର', 'ଥକ୍କା'],
        contraindications: ['ଜ୍ୱର ସହିତ ଗମ୍ଭୀର ରୋଗ', 'ଟିକା ଉପାଦାନରୁ ଜଣା ଆଲର୍ଜି']
      }
    }
  },
  {
    id: 'tetanus',
    name: 'Tetanus Vaccine',
    ageGroups: ['2 months', '4 months', '6 months', '15-18 months', '4-6 years', 'Adults every 10 years'],
    schedule: 'Primary series in infancy, boosters every 10 years',
    description: 'Prevents tetanus, a serious bacterial infection affecting the nervous system.',
    sideEffects: ['Pain and swelling at injection site', 'Mild fever', 'Headache'],
    contraindications: ['Previous severe reaction to tetanus vaccine', 'Moderate to severe acute illness'],
    translations: {
      hindi: {
        name: 'टेटनस वैक्सीन',
        description: 'टेटनस को रोकता है, जो तंत्रिका तंत्र को प्रभावित करने वाला एक गंभीर बैक्टीरियल संक्रमण है।',
        sideEffects: ['इंजेक्शन स्थल पर दर्द और सूजन', 'हल्का बुखार', 'सिरदर्द'],
        contraindications: ['टेटनस वैक्सीन से पहले गंभीर प्रतिक्रिया', 'मध्यम से गंभीर तीव्र बीमारी']
      },
      odia: {
        name: 'ଟିଟାନସ ଟିକା',
        description: 'ଟିଟାନସକୁ ରୋକେ, ଯାହା ସ୍ନାୟୁ ତନ୍ତ୍ରକୁ ପ୍ରଭାବିତ କରୁଥିବା ଏକ ଗମ୍ଭୀର ବ୍ୟାକ୍ଟେରିଆଲ ସଂକ୍ରମଣ।',
        sideEffects: ['ଇଞ୍ଜେକସନ ସ୍ଥାନରେ ଯନ୍ତ୍ରଣା ଏବଂ ଫୁଲା', 'ସାମାନ୍ୟ ଜ୍ୱର', 'ମୁଣ୍ଡ ବିନ୍ଧା'],
        contraindications: ['ଟିଟାନସ ଟିକାରୁ ପୂର୍ବର ଗମ୍ଭୀର ପ୍ରତିକ୍ରିୟା', 'ମଧ୍ୟମରୁ ଗମ୍ଭୀର ତୀବ୍ର ରୋଗ']
      }
    }
  }
];