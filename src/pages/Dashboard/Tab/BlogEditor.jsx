import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import ImageTool from "@editorjs/image";
import { useRecoilState } from "recoil";
import {
  editorInstancesAtom,
  mobileLayoutStateAtom,
} from "../../../store/atoms";
import {
  knowUsService,
  philanthropyService,
  causesService,
  vmEditionsService,
  imageUploadService,
} from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Example Pages
const pages = [
  { id: "know-us", label: "Know Us" },
  { id: "philanthropy", label: "Philanthropy" },
  { id: "causes", label: "Causes We Support" },
  { id: "vmEditions", label: "vmEditions" },
];

const BlogEditor = () => {
  const [editor, setEditor] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const isMountedRef = useRef(true);
  const [, setEditorInstances] = useRecoilState(editorInstancesAtom);
  const [, setMobileLayouts] = useRecoilState(mobileLayoutStateAtom);

  const [selectedPage, setSelectedPage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const mobileLayoutHandlerRef = useRef(null);

  useEffect(() => {
    const blogEditorId = "blog-editor"; // Use a constant ID for this editor

    const initializeEditor = async () => {
      try {
        // Only initialize if no editor exists
        if (!editor) {
          const editorInstance = new EditorJS({
            holder: "editorjs",
            tools: {
              header: Header,
              list: List,
              embed: Embed,
              image: {
                class: ImageTool,
                config: {
                  uploader: {
                    /**
                     * Upload file to the server and return an uploaded image data
                     * @param {File} file - file selected from the device or pasted by drag-n-drop
                     * @return {Promise.<{success, file: {url}}>}
                     */
                    // uploadByFile: async (file) => {
                    //   try {
                    //     const response = await imageUploadService.uploadImage(
                    //       file
                    //     );
                    //     // Make sure response has success and file
                    //     return {
                    //       success: 1,
                    //       file: {
                    //         url: response.url, // adjust based on your API
                    //         name: file.name,
                    //         size: file.size,
                    //       },
                    //     };
                    //   } catch (error) {
                    //     console.error("Image upload failed:", error);
                    //     // fallback to local file reader
                    //     return new Promise((resolve) => {
                    //       const reader = new FileReader();
                    //       reader.onload = (e) => {
                    //         resolve({
                    //           success: 1,
                    //           file: {
                    //             url: e.target.result,
                    //             name: file.name,
                    //             size: file.size,
                    //           },
                    //         });
                    //       };
                    //       reader.readAsDataURL(file);
                    //     });
                    //   }
                    // },

                    /**
                     * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                     * @param {string} url - pasted image URL
                     * @return {Promise.<{success, file: {url}}>}
                     */
                    uploadByFile: async (file) => {
                      try {
                        const response = await imageUploadService.uploadImage(
                          file
                        );
                        console.log("Raw image upload response:", response);

                        // Ensure response and response.url exist
                        if (!response || !response.url) {
                          throw new Error("Invalid image upload response");
                        }

                        return {
                          success: 1,
                          file: {
                            url: response.url,
                            name: file.name,
                            size: file.size,
                          },
                        };
                      } catch (error) {
                        console.error("Image upload failed:", error);

                        // Fallback to local file reader
                        return new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            resolve({
                              success: 1,
                              file: {
                                url: e.target.result,
                                name: file.name,
                                size: file.size,
                              },
                            });
                          };
                          reader.readAsDataURL(file);
                        });
                      }
                    },
                  },
                },
              },
            },
            placeholder: "Start writing your blog here...",
            onReady: () => {
              if (isMountedRef.current) {
                console.log("Editor.js is ready to work!");
                setIsEditorReady(true);

                // Store the instance in Recoil state
                setEditorInstances((prev) => {
                  const newMap = new Map(prev);
                  newMap.set(blogEditorId, editorInstance);
                  return newMap;
                });

                // Set up an event handler for mobile layout events to prevent warnings
                try {
                  const mobileLayoutHandler = (isMobile) => {
                    setMobileLayouts((prev) => {
                      const newMap = new Map(prev);
                      newMap.set(blogEditorId, isMobile);
                      return newMap;
                    });
                  };
                  mobileLayoutHandlerRef.current = mobileLayoutHandler;
                  editorInstance.events.on(
                    "editor mobile layout toggled",
                    mobileLayoutHandler
                  );
                } catch (error) {
                  console.debug("Mobile layout event setup failed:", error);
                }
              }
            },
          });

          if (isMountedRef.current) {
            setEditor(editorInstance);
          }
        }
      } catch (error) {
        console.error("Error initializing EditorJS:", error);
        setIsEditorReady(false);
      }
    };

    initializeEditor();

    return () => {
      isMountedRef.current = false;
      const blogEditorId = "blog-editor";

      // Clean up event handlers to prevent warnings
      if (editor && editor.events && mobileLayoutHandlerRef.current) {
        try {
          editor.events.off(
            "editor mobile layout toggled",
            mobileLayoutHandlerRef.current
          );
        } catch (error) {
          console.debug("Error cleaning up event handlers:", error);
        }
      }

      // Only destroy if editor is ready and initialized
      if (editor && editor.destroy && isEditorReady) {
        editor.destroy().catch((error) => {
          console.error("Error destroying EditorJS:", error);
        });
        setEditor(null);
        setIsEditorReady(false);

        // Remove from Recoil state
        setEditorInstances((prev) => {
          const newMap = new Map(prev);
          newMap.delete(blogEditorId);
          return newMap;
        });

        setMobileLayouts((prev) => {
          const newMap = new Map(prev);
          newMap.delete(blogEditorId);
          return newMap;
        });
      }
    };
  }, [editor, isEditorReady, setEditorInstances, setMobileLayouts]);

  // Fetch categories when page is selected
  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedPage) {
        setCategories([]);
        return;
      }

      setLoading(true);
      try {
        const service = getServiceByPage(selectedPage);
        if (service) {
          const response = await service.getAll();
          const data = response.data || response;

          // Extract unique categories from the data
          const uniqueCategories = [];
          if (Array.isArray(data)) {
            data.forEach((item) => {
              let categoryField;
              switch (selectedPage) {
                case "philanthropy":
                  categoryField = item.philantropyType; // Note: server returns without 'h'
                  break;
                case "know-us":
                  categoryField = item.knowusType;
                  break;
                case "causes":
                  categoryField = item.causesType;
                  break;
                case "vmEditions":
                  categoryField = item.vmeditionsType;
                  break;
                default:
                  break;
              }

              if (categoryField && !uniqueCategories.includes(categoryField)) {
                uniqueCategories.push(categoryField);
              }
            });
          }

          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load existing categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [selectedPage]);

  // 🔹 Get the appropriate service based on selected page
  const getServiceByPage = (page) => {
    switch (page) {
      case "philanthropy":
        return philanthropyService;
      case "know-us":
        return knowUsService;
      case "causes":
        return causesService;
      case "vmEditions":
        return vmEditionsService;
      default:
        return null;
    }
  };

  // 🔹 Build payload based on selected page
  const buildPayload = (page, category, content) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    switch (page) {
      case "philanthropy":
        return {
          philantropyType: category,
          philantropyContent: JSON.stringify(content),
          philantropySlug: slug,
        };
      case "know-us":
        return {
          knowusType: category,
          knowusContent: JSON.stringify(content),
          knowusSlug: slug,
        };
      case "causes":
        return {
          causesType: category,
          causesContent: JSON.stringify(content),
          causesSlug: slug,
        };
      case "vmEditions":
        return {
          vmeditionsType: category,
          vmeditionsContent: JSON.stringify(content),
          vmeditionsSlug: slug,
        };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    if (!selectedPage) {
      toast.error("Please select a page before saving.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category before saving.");
      return;
    }

    if (editor) {
      try {
        toast.info("Saving blog...");

        // Validate editor content
        const content = await editor.save();
        if (!content.blocks || content.blocks.length === 0) {
          toast.warning("Please add some content to your blog post.");
          return;
        }

        const payload = buildPayload(selectedPage, selectedCategory, content);
        const service = getServiceByPage(selectedPage);

        if (!service) {
          toast.error("Invalid page selected.");
          return;
        }

        console.log("Saving payload:", payload); // Debug log
        console.log("Using service:", service); // Debug log
        console.log("Service method exists:", typeof service.add); // Debug log

        try {
          // Use the appropriate service to save the blog
          const response = await service.add(payload);
          console.log("Blog saved:", response);
        } catch (serviceError) {
          console.error("Service error details:", {
            message: serviceError.message,
            response: serviceError.response?.data,
            status: serviceError.response?.status,
            url: serviceError.config?.url,
          });

          // If it's a 404 (endpoint not found), offer to save locally for testing
          if (serviceError.response?.status === 404) {
            const shouldSaveLocally = window.confirm(
              `The server endpoint for ${selectedPage} is not available. Would you like to save this content locally for testing? (It will be stored in browser's localStorage)`
            );

            if (shouldSaveLocally) {
              // Save to localStorage as fallback
              const localKey = `blog_${selectedPage}_${selectedCategory}_${Date.now()}`;
              localStorage.setItem(
                localKey,
                JSON.stringify({
                  page: selectedPage,
                  category: selectedCategory,
                  content: payload,
                  timestamp: new Date().toISOString(),
                })
              );

              toast.success(`Blog saved locally! Key: ${localKey}`);
              console.log("Saved locally with key:", localKey);

              // Reset form
              const currentPage = selectedPage;
              setSelectedCategory("");
              if (editor) {
                editor.clear();
              }

              setTimeout(() => {
                setSelectedPage("");
                setSelectedPage(currentPage);
              }, 100);

              return; // Exit early, don't throw error
            }
          }

          throw serviceError; // Re-throw to be handled by outer catch
        }
        toast.success(
          `${
            selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)
          } blog saved successfully!`
        );

        // Reset form after successful save
        const currentPage = selectedPage; // Store current page
        setSelectedCategory("");
        if (editor) {
          editor.clear();
        }

        // Refresh categories for the current page to include the new category
        setTimeout(() => {
          setSelectedPage("");
          setSelectedPage(currentPage);
        }, 100);
      } catch (error) {
        console.error("Error saving blog:", error);

        // Better error handling
        let errorMessage = "Failed to save blog";

        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          const data = error.response.data;

          if (status === 404) {
            errorMessage = `API endpoint "${selectedPage}/add" not found. The server might not have this feature implemented yet.`;
          } else if (status === 500) {
            errorMessage = "Server error occurred. Please try again later.";
          } else if (status === 400) {
            errorMessage =
              data?.message ||
              "Invalid data sent to server. Please check your input.";
          } else if (data && data.message) {
            errorMessage = data.message;
          } else {
            errorMessage = `Server error: ${status}`;
          }
        } else if (error.request) {
          // Request was made but no response received
          errorMessage =
            "Cannot connect to server. Please check your internet connection.";
        } else {
          // Something else happened
          errorMessage = error.message || "An unexpected error occurred";
        }

        toast.error(errorMessage);
      }
    } else {
      toast.error("Editor is not ready. Please try again.");
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.warning("Please enter a category name.");
      return;
    }
    if (categories.includes(newCategory)) {
      toast.warning("Category already exists.");
      return;
    }
    setCategories((prev) => [...prev, newCategory]);
    setSelectedCategory(newCategory);
    setNewCategory("");
    toast.success(`Category "${newCategory}" added successfully!`);
  };

  // Debug function to view locally saved content
  const viewLocalContent = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("blog_")
    );
    if (keys.length === 0) {
      toast.info("No locally saved content found.");
      return;
    }

    console.log("Locally saved blog content:");
    keys.forEach((key) => {
      const content = JSON.parse(localStorage.getItem(key));
      console.log(key, content);
    });

    toast.info(
      `Found ${keys.length} locally saved blog(s). Check console for details.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Editor</h1>
          <p className="text-gray-600">
            Create and manage content for different pages
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">
              Create New Blog Post
            </h2>
            <p className="text-indigo-100 mt-1">
              Select a page and category to get started
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Page Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Page <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedPage}
                onChange={(e) => {
                  setSelectedPage(e.target.value);
                  setSelectedCategory(""); // Reset category when page changes
                }}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
              >
                <option value="">-- Choose a Page --</option>
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Category <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!selectedPage || loading}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!selectedPage
                    ? "-- Choose a Page First --"
                    : loading
                    ? "-- Loading Categories --"
                    : categories.length === 0
                    ? "-- No Categories Available --"
                    : "-- Choose a Category --"}
                </option>
                {!loading &&
                  categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Add New Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Add New Category (Optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter new category name..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 border-2 border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                />
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Add Category
                </button>
              </div>
            </div>

            {/* Editor Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <div
                id="editorjs"
                className="border-2 border-gray-200 rounded-lg p-4 min-h-[400px] focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors bg-white"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={viewLocalContent}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                title="View locally saved content for debugging"
              >
                View Local Content
              </button>
              <button
                onClick={handleSave}
                disabled={!selectedPage || !selectedCategory}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
                  selectedPage && selectedCategory
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedPage && selectedCategory
                  ? "Save Blog Post"
                  : "Select Page & Category"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
      />
    </div>
  );
};

export default BlogEditor;
