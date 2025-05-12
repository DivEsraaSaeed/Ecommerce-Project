import { storeData, usersData } from './data.js';

// تهيئة التخزين المحلي
function initializeStorage() {
  const initialData = {
    store: storeData,
    users: usersData,
    currentUser: null, // سيتم تعبئته عند تسجيل الدخول
    cart: [], // سلة المشتريات
    orders: [] // الطلبات السابقة
  };

  if (!localStorage.getItem('ecomData')) {
    localStorage.setItem('ecomData', JSON.stringify(initialData));
    console.log("تم تهيئة بيانات المتجر لأول مرة");
  }
}

// استدعاء التهيئة عند تحميل الصفحة
initializeStorage();