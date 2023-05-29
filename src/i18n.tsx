import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  EN: {
    translation: {
      'back': 'back',
      'Test 1':'Test 1',
      'Test 2':'Test 2',
      'Form Layout':'Form Layout',
      'Website Layout':'Website Layout',
      'prefix':'prefix',
      'first name':'first name',
      'last name':'last name',
      'birth date':'birth date',
      'nationality':'nationality',
      'ID card number':'ID card number',
      'gender':'gender',
      'phone number':'phone number',
      'passport ID':'passport ID',
      'salary':'salary',
      'Men':'Men',
      'Female':'Female',
      'not define':'not define',
      'clear':'clear',
      'save':'save',
      'edit':'edit',
      'Thai':'Thai',
      'Chinese':'Chinese',
      'American':'America',
      'manage':'manage',
      'Delete data':'Delete data',
      'Are you sure to want to delete all your selected data(s) ?':'Are you sure to want to delete all your selected data(s) ?',
      'delete all selected data':'delete all selected data',
      'OK':'OK',
      'Cancel':'Cancel'
    }
  },
  TH: {
    translation: {
      'back': 'ย้อนกลับ',
      'Test 1':'แบบทดสอบที่ 1',
      'Test 2':'แบบทดสอบที่ 1',
      'Form Layout':'การจัดหน้าฟอร์ม',
      'Website Layout':'การจัดหน้าฟอร์ม',
      'prefix':'คำนำหน้า',
      'first name':'ชื่อจริง',
      'last name':'นามสกุล',
      'birth date':'วันเกิด',
      'nationality':'สัญชาติ',
      'ID card number':'เลขประชาชน',
      'gender':'เพศ',
      'phone number':'เบอร์โทรศัพท์',
      'passport ID':'เลขหนังสือเดินทาง',
      'salary':'เงินเดือน',
      'Men':'ชาย',
      'Female':'หญิง',
      'not define':'ไม่ระบุ',
      'clear':'ล้างข้อมูล',
      'save':'บันทึกข้อมูล',
      'edit':'แก้ไขข้อมูล',
      'Thai':'ไทย',
      'Chinese':'จีน',
      'American':'อเมริกัน',
      'manage':'จัดการ',
      'Delete data':'ลบข้อมูล',
      'Are you sure to want to delete all your selected data(s) ?':'คุณต้องการลบข้อมูลทั้งหมดที่คุณเลือกหรือไม่ ?',
      'delete all selected data':'ลบข้อมูลทั้งหมดที่เลือก',
      'OK':'ตกลง',
      'Cancel':'ยกเลิก'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;

