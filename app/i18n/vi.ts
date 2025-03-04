const vi = {
  common: {
    ok: "OK!",
    cancel: "Hủy",
    back: "Quay lại",
  },
  welcomeScreen: {
    postscript:
      "psst — Có lẽ đây không phải là giao diện của ứng dụng của bạn. (Trừ khi nhà thiết kế của bạn đã đưa cho bạn các màn hình này, và trong trường hợp đó, hãy triển khai ngay!)",
    readyForLaunch: "Ứng dụng của bạn, gần như sẵn sàng để ra mắt!",
    exciting: "(ồ, thật thú vị!)",
  },
  errorScreen: {
    title: "Đã xảy ra lỗi!",
    friendlySubtitle:
      "Đây là màn hình mà người dùng của bạn sẽ thấy khi có lỗi xảy ra trong môi trường sản xuất. Bạn sẽ muốn tùy chỉnh thông báo này (nằm trong file `app/i18n/en.ts`) và có lẽ cả giao diện nữa (`app/screens/ErrorScreen`). Nếu bạn muốn loại bỏ hoàn toàn phần này, hãy kiểm tra component `<ErrorBoundary>` trong file `app/app.tsx`.",
    reset: "KHỞI TẠI LẠI ỨNG DỤNG",
  },
  emptyStateComponent: {
    generic: {
      heading: "Rỗng quá... buồn quá",
      content: "Chưa tìm thấy dữ liệu nào. Hãy thử nhấn nút để làm mới hoặc tải lại ứng dụng.",
      button: "Hãy thử lại nào",
    },
  },
  navigators: {
    home: "Trang chủ",
    setting: "Cài đặt",
    library: "Thư viện",
  },
}

export default vi
export type Translations = typeof vi
