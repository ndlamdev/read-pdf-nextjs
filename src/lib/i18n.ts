export type Language = "vi" | "en";

export const translations = {
  vi: {
    title: "Đọc File PDF",
    description: "Tải lên và xem file PDF của bạn",
    uploadButton: "Chọn File PDF",
    uploadPrompt: "Kéo thả file PDF vào đây hoặc nhấn để chọn file",
    uploadDescription: "Hỗ trợ định dạng PDF",
    noFile: "Chưa có file nào được chọn",
    loading: "Đang tải...",
    page: "Trang",
    of: "của",
    previousPage: "Trang trước",
    nextPage: "Trang sau",
    zoomIn: "Phóng to",
    zoomOut: "Thu nhỏ",
    download: "Tải xuống",
    closeFile: "Đóng file",
    error: "Lỗi khi tải file PDF",
    invalidFile: "Vui lòng chọn file PDF hợp lệ",
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
    footerPage: "Xây bằng Next.js 15, React PDF, Tailwind CSS, và shadcn/ui"
  },
  en: {
    title: "PDF Reader",
    description: "Upload and view your PDF files",
    uploadButton: "Select PDF File",
    uploadPrompt: "Drag & drop PDF file here or click to select",
    uploadDescription: "Supports PDF format",
    noFile: "No file selected",
    loading: "Loading...",
    page: "Page",
    of: "of",
    previousPage: "Previous page",
    nextPage: "Next page",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    download: "Download",
    closeFile: "Close file",
    error: "Error loading PDF file",
    invalidFile: "Please select a valid PDF file",
    language: "Language",
    vietnamese: "Vietnamese",
    english: "English",
    footerPage: "Built with Next.js 15, React PDF, Tailwind CSS, and shadcn/ui"
  },
};

export function getTranslations(lang: Language) {
  return translations[lang];
}