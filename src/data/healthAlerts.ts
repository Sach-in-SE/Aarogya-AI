import { HealthAlert } from '../types/health';

export const healthAlerts: HealthAlert[] = [
  {
    id: 'monsoon-diseases-2024',
    title: 'Monsoon Disease Prevention Alert',
    description: 'High risk of vector-borne diseases during monsoon season. Take preventive measures against malaria, dengue, and chikungunya.',
    severity: 'warning',
    location: 'Odisha',
    date: new Date('2024-07-15'),
    source: 'State Health Department',
    translations: {
      hindi: {
        title: 'मानसून रोग रोकथाम चेतावनी',
        description: 'मानसून के दौरान वेक्टर-बोर्न रोगों का उच्च जोखिम। मलेरिया, डेंगू और चिकनगुनिया से बचाव के उपाय करें।'
      },
      odia: {
        title: 'ବର୍ଷାକାଳ ରୋଗ ପ୍ରତିରୋଧ ସତର୍କତା',
        description: 'ବର୍ଷା ସମୟରେ ଭେକ୍ଟର-ଜନିତ ରୋଗର ଉଚ୍ଚ ବିପଦ। ମ୍ୟାଲେରିଆ, ଡେଙ୍ଗୁ ଏବଂ ଚିକୁନଗୁନିଆରୁ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା ନିଅନ୍ତୁ।'
      }
    }
  },
  {
    id: 'water-contamination-alert',
    title: 'Water Quality Alert',
    description: 'Reports of waterborne illness in coastal areas. Drink only boiled or filtered water. Avoid street food.',
    severity: 'danger',
    location: 'Coastal Odisha',
    date: new Date('2024-08-10'),
    source: 'District Health Office',
    translations: {
      hindi: {
        title: 'पानी की गुणवत्ता चेतावनी',
        description: 'तटीय क्षेत्रों में जलजनित बीमारियों की रिपोर्ट। केवल उबला या फ़िल्टर किया गया पानी पिएं। स्ट्रीट फूड से बचें।'
      },
      odia: {
        title: 'ପାଣି ଗୁଣବତ୍ତା ସତର୍କତା',
        description: 'ଉପକୂଳବର୍ତ୍ତୀ ଅଞ୍ଚଳରେ ଜଳଜନିତ ରୋଗର ରିପୋର୍ଟ। କେବଳ ଫୁଟାଇ କିମ୍ବା ଛାଣି ଦିଆ ପାଣି ପିଅନ୍ତୁ। ରାସ୍ତା ଖାଦ୍ୟଠାରୁ ଦୂରେ ରୁହନ୍ତୁ।'
      }
    }
  },
  {
    id: 'vaccination-drive-2024',
    title: 'Free Vaccination Drive',
    description: 'Free COVID-19 booster and routine immunizations available at all Primary Health Centers. Bring vaccination cards.',
    severity: 'info',
    location: 'All Districts',
    date: new Date('2024-09-01'),
    source: 'Ministry of Health',
    translations: {
      hindi: {
        title: 'मुफ्त टीकाकरण अभियान',
        description: 'सभी प्राथमिक स्वास्थ्य केंद्रों पर मुफ्त कोविड-19 बूस्टर और नियमित टीकाकरण उपलब्ध। टीकाकरण कार्ड साथ लाएं।'
      },
      odia: {
        title: 'ମାଗଣା ଟିକାକରଣ ଅଭିଯାନ',
        description: 'ସମସ୍ତ ପ୍ରାଥମିକ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ରରେ ମାଗଣା କୋଭିଡ-୧୯ ବୁଷ୍ଟର ଏବଂ ନିୟମିତ ଟିକାକରଣ ଉପଲବ୍ଧ। ଟିକାକରଣ କାର୍ଡ ସାଙ୍ଗରେ ଆଣନ୍ତୁ।'
      }
    }
  }
];