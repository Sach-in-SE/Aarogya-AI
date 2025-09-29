import { Disease } from '../types/health';

export const diseases: Disease[] = [
  {
    id: 'malaria',
    name: 'Malaria',
    category: 'Vector-borne Disease',
    symptoms: ['Fever', 'Chills', 'Headache', 'Muscle aches', 'Nausea', 'Vomiting'],
    causes: ['Mosquito bite from infected Anopheles mosquito', 'Plasmodium parasites'],
    prevention: [
      'Use mosquito nets while sleeping',
      'Apply mosquito repellent',
      'Eliminate stagnant water around homes',
      'Keep surroundings clean',
      'Wear full-sleeve clothes during evening and night'
    ],
    treatment: [
      'Consult doctor immediately if symptoms appear',
      'Take prescribed antimalarial medication',
      'Complete the full course of treatment',
      'Rest and stay hydrated',
      'Monitor temperature regularly'
    ],
    severity: 'high',
    contagious: false,
    translations: {
      hindi: {
        name: 'मलेरिया',
        symptoms: ['बुखार', 'ठंड लगना', 'सिरदर्द', 'मांसपेशियों में दर्द', 'जी मिचलाना', 'उल्टी'],
        causes: ['संक्रमित एनोफिलीज मच्छर के काटने से', 'प्लाज्मोडियम परजीवी'],
        prevention: [
          'सोते समय मच्छरदानी का प्रयोग करें',
          'मच्छर भगाने वाली दवा लगाएं',
          'घर के आसपास रुके पानी को हटाएं',
          'आसपास की सफाई रखें',
          'शाम और रात में पूरी बाजू के कपड़े पहनें'
        ],
        treatment: [
          'लक्षण दिखने पर तुरंत डॉक्टर से मिलें',
          'निर्धारित मलेरिया रोधी दवा लें',
          'इलाज का पूरा कोर्स करें',
          'आराम करें और तरल पदार्थ लें',
          'नियमित रूप से तापमान की जांच करें'
        ]
      },
      odia: {
        name: 'ମ୍ୟାଲେରିଆ',
        symptoms: ['ଜ୍ୱର', 'ଥଣ୍ଡା ଲାଗିବା', 'ମୁଣ୍ଡ ବିନ୍ଧା', 'ମାଂସପେଶୀ ବିନ୍ଧା', 'ବାନ୍ତି ଲାଗିବା', 'ବାନ୍ତି'],
        causes: ['ସଂକ୍ରମିତ ଆନୋଫିଲିସ ମଶା କାମୁଡ଼ିବା', 'ପ୍ଲାଜମୋଡିୟମ ପରଜୀବୀ'],
        prevention: [
          'ଶୋଇବା ସମୟରେ ମଶା ଜାଲ ବ୍ୟବହାର କରନ୍ତୁ',
          'ମଶା ଘଉଡ଼ାଉ ଔଷଧ ଲଗାନ୍ତୁ',
          'ଘର ଚାରିପଟେ ରୁଚିଥିବା ପାଣି ହଟାନ୍ତୁ',
          'ପରିବେଶକୁ ସଫା ରଖନ୍ତୁ',
          'ସାଞ୍ଜ ଓ ରାତିରେ ପୂରା ହାତ ଢାଙ୍କିବା ପୋଷାକ ପିନ୍ଧନ୍ତୁ'
        ],
        treatment: [
          'ଲକ୍ଷଣ ଦେଖାଗଲେ ତୁରନ୍ତ ଡାକ୍ତରଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ',
          'ନିର୍ଦ୍ଦିଷ୍ଟ ମ୍ୟାଲେରିଆ ବିରୋଧୀ ଔଷଧ ସେବନ କରନ୍ତୁ',
          'ଚିକିତ୍ସାର ସମ୍ପୂର୍ଣ୍ଣ କୋର୍ସ କରନ୍ତୁ',
          'ବିଶ୍ରାମ ନିଅନ୍ତୁ ଓ ତରଳ ପଦାର୍ଥ ପିଅନ୍ତୁ',
          'ନିୟମିତ ତାପମାତ୍ରା ଯାଞ୍ଚ କରନ୍ତୁ'
        ]
      }
    }
  },
  {
    id: 'dengue',
    name: 'Dengue Fever',
    category: 'Vector-borne Disease',
    symptoms: ['High fever', 'Severe headache', 'Eye pain', 'Muscle pain', 'Joint pain', 'Rash'],
    causes: ['Aedes mosquito bite', 'Dengue virus'],
    prevention: [
      'Remove standing water from containers',
      'Use mosquito nets and repellents',
      'Keep water storage containers covered',
      'Maintain cleanliness around living areas',
      'Wear protective clothing'
    ],
    treatment: [
      'Seek immediate medical attention',
      'Take paracetamol for fever (avoid aspirin)',
      'Increase fluid intake',
      'Monitor platelet count regularly',
      'Watch for warning signs like bleeding'
    ],
    severity: 'high',
    contagious: false,
    translations: {
      hindi: {
        name: 'डेंगू बुखार',
        symptoms: ['तेज बुखार', 'तीव्र सिरदर्द', 'आंखों में दर्द', 'मांसपेशियों में दर्द', 'जोड़ों में दर्द', 'दाने'],
        causes: ['एडीस मच्छर का काटना', 'डेंगू वायरस'],
        prevention: [
          'बर्तनों से रुका हुआ पानी हटाएं',
          'मच्छरदानी और रिपेलेंट का उपयोग करें',
          'पानी के भंडारण के बर्तनों को ढककर रखें',
          'रहने के क्षेत्र के आसपास सफाई रखें',
          'सुरक्षात्मक कपड़े पहनें'
        ],
        treatment: [
          'तुरंत चिकित्सा सहायता लें',
          'बुखार के लिए पैरासिटामोल लें (एस्पिरिन से बचें)',
          'तरल पदार्थों का सेवन बढ़ाएं',
          'प्लेटलेट काउंट की नियमित जांच कराएं',
          'खून बहने जैसे चेतावनी संकेतों पर नजर रखें'
        ]
      },
      odia: {
        name: 'ଡେଙ୍ଗୁ ଜ୍ୱର',
        symptoms: ['ତୀବ୍ର ଜ୍ୱର', 'ପ୍ରବଳ ମୁଣ୍ଡ ବିନ୍ଧା', 'ଆଖି ବିନ୍ଧା', 'ମାଂସପେଶୀ ବିନ୍ଧା', 'ଗଣ୍ଠି ବିନ୍ଧା', 'ଦାଗ'],
        causes: ['ଏଡିସ ମଶା କାମୁଡ଼ିବା', 'ଡେଙ୍ଗୁ ଭାଇରସ'],
        prevention: [
          'ପାତ୍ରରୁ ରୁଚିଥିବା ପାଣି ହଟାନ୍ତୁ',
          'ମଶା ଜାଲ ଓ ଘଉଡ଼ାଉ ଔଷଧ ବ୍ୟବହାର କରନ୍ତୁ',
          'ପାଣି ସଂରକ୍ଷଣ ପାତ୍ରଗୁଡ଼ିକୁ ଢାଙ୍କି ରଖନ୍ତୁ',
          'ବାସ ସ୍ଥାନ ଚାରିପଟେ ସଫା ରଖନ୍ତୁ',
          'ସୁରକ୍ଷାତ୍ମକ ପୋଷାକ ପିନ୍ଧନ୍ତୁ'
        ],
        treatment: [
          'ତୁରନ୍ତ ଚିକିତ୍ସା ସହାୟତା ନିଅନ୍ତୁ',
          'ଜ୍ୱର ପାଇଁ ପାରାସିଟାମଲ ନିଅନ୍ତୁ (ଆସ୍ପିରିନଠାରୁ ଦୂରେ ରୁହନ୍ତୁ)',
          'ତରଳ ପଦାର୍ଥ ସେବନ ବଢ଼ାନ୍ତୁ',
          'ନିୟମିତ ପ୍ଲାଟଲେଟ ସଂଖ୍ୟା ଯାଞ୍ଚ କରନ୍ତୁ',
          'ରକ୍ତ ବହିବା ପରି ଚେତାବନୀ ସଙ୍କେତ ଉପରେ ନଜର ରଖନ୍ତୁ'
        ]
      }
    }
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    category: 'Metabolic Disorder',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Unexplained weight loss', 'Fatigue', 'Blurred vision', 'Slow healing wounds'],
    causes: ['Genetic factors', 'Lifestyle factors', 'Obesity', 'Physical inactivity', 'Poor diet'],
    prevention: [
      'Maintain healthy weight',
      'Exercise regularly (30 minutes daily)',
      'Eat balanced diet with whole grains, fruits, vegetables',
      'Limit sugar and processed foods',
      'Regular health checkups',
      'Manage stress levels'
    ],
    treatment: [
      'Regular blood sugar monitoring',
      'Follow prescribed medication schedule',
      'Maintain diabetic diet plan',
      'Regular physical activity',
      'Regular medical checkups',
      'Foot care and wound monitoring'
    ],
    severity: 'moderate',
    contagious: false,
    translations: {
      hindi: {
        name: 'मधुमेह',
        symptoms: ['अत्यधिक प्यास', 'बार-बार पेशाब आना', 'अस्पष्टीकृत वजन घटना', 'थकान', 'धुंधली दृष्टि', 'घाव धीरे भरना'],
        causes: ['आनुवंशिक कारक', 'जीवनशैली कारक', 'मोटापा', 'शारीरिक निष्क्रियता', 'खराब आहार'],
        prevention: [
          'स्वस्थ वजन बनाए रखें',
          'नियमित व्यायाम करें (प्रतिदिन 30 मिनट)',
          'साबुत अनाज, फल, सब्जियों के साथ संतुलित आहार लें',
          'चीनी और प्रसंस्कृत खाद्य पदार्थों को सीमित करें',
          'नियमित स्वास्थ्य जांच कराएं',
          'तनाव के स्तर को नियंत्रित करें'
        ],
        treatment: [
          'नियमित ब्लड शुगर मॉनिटरिंग',
          'निर्धारित दवा का समय पालन करें',
          'मधुमेह आहार योजना का पालन करें',
          'नियमित शारीरिक गतिविधि',
          'नियमित चिकित्सा जांच',
          'पैरों की देखभाल और घाव की निगरानी'
        ]
      },
      odia: {
        name: 'ମଧୁମେହ',
        symptoms: ['ଅତ୍ୟଧିକ ତୃଷା', 'ବାରମ୍ବାର ପରିସ୍ରା', 'ଅସ୍ପଷ୍ଟ ଓଜନ କମିବା', 'କ୍ଳାନ୍ତି', 'ଅସ୍ପଷ୍ଟ ଦୃଷ୍ଟି', 'କ୍ଷତ ଧୀରେ ଭଲ ହେବା'],
        causes: ['ବଂଶଗତ କାରଣ', 'ଜୀବନଶୈଳୀ କାରଣ', 'ମୋଟାପଣ', 'ଶାରୀରିକ ନିଷ୍କ୍ରିୟତା', 'ଖରାପ ଖାଦ୍ୟ'],
        prevention: [
          'ସୁସ୍ଥ ଓଜନ ବଜାୟ ରଖନ୍ତୁ',
          'ନିୟମିତ ବ୍ୟାୟାମ କରନ୍ତୁ (ଦିନକୁ ୩୦ ମିନିଟ)',
          'ସମ୍ପୂର୍ଣ୍ଣ ଶସ୍ୟ, ଫଳ, ତରକାରୀ ସହିତ ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଖାଆନ୍ତୁ',
          'ଚିନି ଓ ପ୍ରକ୍ରିୟାଜାତ ଖାଦ୍ୟ ସୀମିତ କରନ୍ତୁ',
          'ନିୟମିତ ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା କରାନ୍ତୁ',
          'ଚାପ ସ୍ତରକୁ ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ'
        ],
        treatment: [
          'ନିୟମିତ ରକ୍ତ ଶର୍କରା ମନିଟରିଂ',
          'ନିର୍ଦ୍ଦିଷ୍ଟ ଔଷଧ ସମୟସୂଚୀ ଅନୁସରଣ କରନ୍ତୁ',
          'ମଧୁମେହ ଖାଦ୍ୟ ଯୋଜନା ପାଳନ କରନ୍ତୁ',
          'ନିୟମିତ ଶାରୀରିକ କାର୍ଯ୍ୟକଳାପ',
          'ନିୟମିତ ଚିକିତ୍ସା ଯାଞ୍ଚ',
          'ପାଦ ଯତ୍ନ ଓ କ୍ଷତ ମନିଟରିଂ'
        ]
      }
    }
  }
];