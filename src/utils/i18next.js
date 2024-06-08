import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const language = localStorage.getItem("language");

const resources = {
  EN: {
    translation: {
      sidebar: {
        dashboard: "Dashboard",
        tables: "Tables",
        products: "Products",
        discounts: "Discounts",
        customers: "Customers",
        features: "Features",
        orders: "Orders",
        kitchen: "Kitchen",
        inventory: "Inventory",
        ratings: "Ratings",
        reports: "Reports",
        Applications: "Applications",
        settings: "Settings",
      },
      dashboard: {
        financial: "Financial",
        today: "Today",
        week: "Week",
        month: "Month",
        totalRevenue: "Total Revenue",
        totalOrders: "Total Orders",
        mostPopularProducts: "Most Popular Products",
        beafBurger: "Beaf Burger",
        pepsiCols: "Pepsi Cols 330ml",
        water: "Water 250ml",
        cake: "Cake",
        branches: "Branches",
        locationName: "Location Name",
        ordersNumber: "Orders Number",
        doha: "doha",
        startAt: "Start At",
        endAt: "End At",
        almostOutOfStock: "Almost Out of Stock",
        frenchFries: "French Fries",
        pizza: "pizza",
        latestOrders: "Latest Orders",
        source: "Source",
        cashier: "Cashier",
        serviceType: "Service Type",
        dining: "Dining",
        tableCode: "Table Code",
        viewDetails: "View Details",
        latestReviews: "Latest Reviews",
        sep: "SEP",
      },
    },
  },
  AR: {
    translation: {
      sidebar: {
        dashboard: "لوحة القيادة",
        tables: "الجداول",
        products: "المنتجات",
        discounts: "الخصومات",
        customers: "العملاء",
        features: "الميزات",
        orders: "الطلبات",
        kitchen: "المطبخ",
        inventory: "المخزون",
        ratings: "التقييمات",
        reports: "التقارير",
        applications: "التطبيقات",
        settings: "الإعدادات",
      },
      dashboard: {
        financial: "المالية",
        today: "اليوم",
        week: "الأسبوع",
        month: "الشهر",
        totalRevenue: "إجمالي الإيرادات",
        totalOrders: "إجمالي الطلبات",
        mostPopularProducts: "أكثر المنتجات شعبية",
        beafBurger: "برجر اللحم",
        pepsiCols: "بيبسي كولا 330 مل",
        water: "ماء 250 مل",
        cake: "كعكة",
        branches: "الفروع",
        locationName: "اسم الموقع",
        ordersNumber: "عدد الطلبات",
        doha: "الدوحة",
        startAt: "البداية",
        endAt: "النهاية",
        almostOutOfStock: "على وشك النفاد",
        frenchFries: "بطاطس مقلية",
        pizza: "بيتزا",
        latestOrders: "أحدث الطلبات",
        source: "المصدر",
        cashier: "أمين الصندوق",
        serviceType: "نوع الخدمة",
        dining: "تناول الطعام",
        tableCode: "رمز الطاولة",
        viewDetails: "عرض التفاصيل",
        latestReviews: "آخر مراجعات",
        sep: "سبتمبر",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language?.toString(), // default language
    fallbackLng: "EN", // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
export default i18n;
