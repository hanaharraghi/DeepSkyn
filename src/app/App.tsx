import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Footer } from "@/app/components/Footer";
import { FloatingChatButton } from "@/app/components/FloatingChatButton";
import { AccessibilityMenu } from "@/app/components/AccessibilityMenu";
import { LandingPage } from "@/app/pages/LandingPage";
import { CreateAccountPage } from "@/app/pages/CreateAccountPage";
import { QuestionnairePage } from "@/app/pages/QuestionnairePage";
import { UploadPage } from "@/app/pages/UploadPage";
import { ResultsPage } from "@/app/pages/ResultsPage";
import { RoutinePage } from "@/app/pages/RoutinePage";
import { ProductsPage } from "@/app/pages/ProductsPage";
import { CheckoutPage } from "@/app/pages/CheckoutPage";
import { ConfirmationPage } from "@/app/pages/ConfirmationPage";
import { CartPage } from "@/app/pages/CartPage";
import { DashboardPage } from "@/app/pages/DashboardPage";
import { ProfilePage } from "@/app/pages/ProfilePage";
import { ChatbotPage } from "@/app/pages/ChatbotPage";
import { OrdersPage } from "@/app/pages/OrdersPage";
import { SignInPage } from "@/app/pages/SignInPage";
import { PremiumPage } from "@/app/pages/PremiumPage";
import { ActivityPage } from "@/app/pages/ActivityPage";
import { OrderDetailsPage } from "@/app/pages/OrderDetailsPage";
import { TrackPackagePage } from "@/app/pages/TrackPackagePage";
import RemindersPage from "@/app/pages/RemindersPage";
import ScannerPage from "@/app/pages/ScannerPage";
import EducationPage from "@/app/pages/EducationPage";
import RewardsPage from "@/app/pages/RewardsPage";
import ProgressTrackerPage from "@/app/pages/ProgressTrackerPage";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import "@/styles/custom.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <NavigationBar />
          <main id="main-content" className="flex-1 pt-20">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/routine" element={<RoutinePage />} />
              <Route path="/reminders" element={<RemindersPage />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/progress" element={<ProgressTrackerPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/order-details" element={<OrderDetailsPage />} />
              <Route path="/track-package" element={<TrackPackagePage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/premium" element={<PremiumPage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingChatButton />
          <AccessibilityMenu />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;