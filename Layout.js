
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { agentSDK } from "@/agents";
import { 
  FileText, 
  Home, 
  Grid3x3, 
  ShoppingBag, 
  Settings,
  Phone,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Added this import for the Button component

import FloatingChatButton from "/components/chat/FloatingChatButton";
import ChatWindow from "/components/chat/ChatWindow";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [chatError, setChatError] = useState(null);

  useEffect(() => {
    // Close chat on page navigation
    setIsChatOpen(false);
  }, [location.pathname]);

  const toggleChat = async () => {
    if (!isChatOpen) {
      if (!conversationId) {
        try {
          // Create a new conversation if one doesn't exist
          const conv = await agentSDK.createConversation({
            agent_name: "support_assistant",
            metadata: { 
              name: "Support Chat",
              description: "Customer support chat session" 
            }
          });
          
          if (conv && conv.id) {
            setConversationId(conv.id);
            setChatError(null);
          } else {
            throw new Error("Failed to create conversation");
          }
        } catch (err) {
          console.error("Error creating conversation:", err);
          setChatError("Failed to start chat. Please try again.");
          return; // Don't open chat if conversation creation failed
        }
      }
    }
    setIsChatOpen(prev => !prev);
  };
  
  const isActive = (pageName) => {
    return location.pathname === createPageUrl(pageName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <style>
        {`
          :root {
            --primary: #065f46;
            --primary-foreground: #ffffff;
            --secondary: #f0fdf4;
            --accent: #10b981;
            --muted: #f8fafc;
            --border: #e2e8f0;
          }
        `}
      </style>
      
      {/* Mobile Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50 md:hidden">
        <div className="flex items-center justify-between p-4">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">AR CV Maker</h1>
              <p className="text-xs text-emerald-600">Professional CVs</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to={createPageUrl("Settings")}>
              <Button variant="ghost" size="icon" className="text-emerald-600">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <a 
              href="tel:+923088527532"
              className="text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white/60 backdrop-blur-md border-r border-emerald-100 min-h-screen sticky top-0">
          <div className="p-6 border-b border-emerald-100">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">AR CV Maker</h1>
                <p className="text-sm text-emerald-600">2000+ Premium Templates</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Link
                to={createPageUrl("Home")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive("Home") 
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg" 
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to={createPageUrl("Templates")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive("Templates") 
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg" 
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
                <span className="font-medium">Templates</span>
              </Link>

              <Link
                to={createPageUrl("Orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive("Orders") 
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg" 
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">My Orders</span>
              </Link>

              <Link
                to={createPageUrl("Admin")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive("Admin") 
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg" 
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Admin</span>
              </Link>

              <Link
                to={createPageUrl("Settings")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive("Settings") 
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg" 
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-emerald-100">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">Contact our support team</p>
              <a 
                href="tel:+923088527532"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                +92-308-8527532
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-emerald-100 md:hidden z-50">
        <div className="flex justify-around py-2">
          <Link
            to={createPageUrl("Home")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              isActive("Home") ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium mt-1">Home</span>
          </Link>

          <Link
            to={createPageUrl("Templates")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              isActive("Templates") ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
            <span className="text-xs font-medium mt-1">Templates</span>
          </Link>

          <Link
            to={createPageUrl("Orders")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              isActive("Orders") ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-medium mt-1">Orders</span>
          </Link>

          <Link
            to={createPageUrl("Admin")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              isActive("Admin") ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-medium mt-1">Admin</span>
          </Link>

          <Link
            to={createPageUrl("Settings")}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              isActive("Settings") ? "text-emerald-600" : "text-gray-500"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-medium mt-1">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Chat Components */}
      <FloatingChatButton onClick={toggleChat} />
      {isChatOpen && (
        <ChatWindow 
          conversationId={conversationId} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </div>
  );
}
