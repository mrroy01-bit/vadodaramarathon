import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer/Footer";
import { knowUsService  } from "../../services/api";
import EditorJS from "@editorjs/editorjs";
import HeaderTool from "@editorjs/header";
import ListTool from "@editorjs/list";

export default function KnowUs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("causes-support");
  const [content, setContent] = useState(null);

  const editorRef = useRef(null); // EditorJS instance
  const holderRef = useRef(null); // EditorJS container

  // Fetch content for active category
  const fetchContent = async (key) => {
    try {
      const response = await knowUsService.getAll();
      console.log("KnowUs response:", response);
      const data = response.data || response;

      const selectedContent = data.find((item) => item.knowusSlug === key);
      setContent(selectedContent || null);
    } catch (error) {
      console.error("Error fetching know us content:", error);
      setContent(null);
    }
  };

  useEffect(() => {
    fetchContent(activeKey);
  }, [activeKey]);

  // Initialize Editor.js and load content whenever it changesknowUsService 
  useEffect(() => {
    if (!holderRef.current) return;

    const setup = async () => {
      // Destroy any existing instance first to avoid holder conflicts
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        try {
          await editorRef.current.destroy();
        } catch (e) {
          console.debug("Editor destroy error:", e);
        } finally {
          editorRef.current = null;
        }
      }

      // Parse stored content (it may be a JSON string)
      let parsedData = undefined;
      if (content?.knowusContent) {
        try {
          parsedData =
            typeof content.knowusContent === "string"
              ? JSON.parse(content.knowusContent)
              : content.knowusContent;
        } catch (e) {
          console.debug("Failed to parse know us content:", e);
        }
      }

      // Create a fresh instance with provided data
      editorRef.current = new EditorJS({
        holder: holderRef.current,
        readOnly: true,
        tools: {
          header: HeaderTool,
          list: ListTool,
        },
        data: parsedData || { time: Date.now(), blocks: [] },
      });
    };

    setup();

    return () => {
      if (editorRef.current) {
        try {
          if (typeof editorRef.current.destroy === "function") {
            editorRef.current.destroy();
          }
        } catch (e) {
          console.debug("Editor cleanup error:", e);
        } finally {
          editorRef.current = null;
        }
      }
    };
  }, [content]);

  // Handle sidebar click
  const handleCategoryClick = (key) => {
    const sanitizedKey = key.replace(/[^a-z0-9-]/gi, "").toLowerCase();
    setActiveKey(sanitizedKey);
    setSidebarOpen(false);
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen relative">
        {/* Mobile menu icon */}
        {!sidebarOpen && (
          <button
            className="md:hidden absolute top-4 mt-24 ml-44 left-4"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu size={28} />
          </button>
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 transition-transform duration-200
            bg-white md:static md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:block
          `}
        >
          <div className="md:hidden flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FiX size={28} />
            </button>
          </div>
          <Sidebar activeKey={activeKey} setActiveKey={handleCategoryClick} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 mt-24 md:mt-0">
          {content ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">
                {content.knowusType }
              </h1>
              {content.knowusContent ? (
                <div ref={holderRef} id="editorjs-holder" />
              ) : (
                <p>No content available</p>
              )}
            </div>
          ) : (
            <p>Select a category to see content</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
