import { useEffect, useRef, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { editorInstancesAtom, mobileLayoutStateAtom } from "../store/atoms";

export function useEditorInstance(editorId) {
  const [editors, setEditors] = useRecoilState(editorInstancesAtom);
  const [, setMobileLayouts] = useRecoilState(mobileLayoutStateAtom); // Only need setter
  const [isReady, setIsReady] = useState(false);
  const editorRef = useRef(null);
  const eventsRef = useRef({});

  // Get editor instance from Recoil state (memoized to avoid dependency issues)
  const getEditorInstance = useCallback(() => {
    return editors.get(editorId) || editorRef.current;
  }, [editors, editorId]);

  // Save editor instance to Recoil state
  const setEditorInstance = useCallback(
    (editor) => {
      if (editor) {
        editorRef.current = editor;
        setEditors((prev) => {
          const newMap = new Map(prev);
          newMap.set(editorId, editor);
          return newMap;
        });
      }
    },
    [editorId, setEditors]
  );

  // Register event listener safely
  const registerEvent = useCallback(
    (eventName, callback) => {
      const editor = getEditorInstance();
      if (editor && editor.events) {
        // Store handler, mark as not bound yet by default
        eventsRef.current[eventName] = {
          handler: callback,
          bound: false,
        };

        // Register immediately if editor is ready
        if (isReady) {
          try {
            editor.events.on(eventName, callback);
            eventsRef.current[eventName].bound = true;
          } catch (error) {
            console.debug(`Error registering ${eventName} event:`, error);
          }
        }
      }
    },
    [getEditorInstance, isReady]
  );

  // Add mobile layout event handler when editor is ready
  useEffect(() => {
    const editor = getEditorInstance();

    if (isReady && editor && editor.events) {
      // Register all stored events that are not yet bound
      Object.entries(eventsRef.current).forEach(([eventName, meta]) => {
        const { handler, bound } = meta || {};
        if (!bound && typeof handler === "function") {
          try {
            editor.events.on(eventName, handler);
            eventsRef.current[eventName].bound = true;
          } catch (error) {
            console.debug(`Error registering ${eventName} event:`, error);
          }
        }
      });

      // Setup mobile layout handler if not already registered
      if (!eventsRef.current["editor mobile layout toggled"]) {
        const mobileLayoutHandler = (isMobile) => {
          setMobileLayouts((prev) => {
            const newMap = new Map(prev);
            newMap.set(editorId, isMobile);
            return newMap;
          });
        };

        try {
          editor.events.on("editor mobile layout toggled", mobileLayoutHandler);
          eventsRef.current["editor mobile layout toggled"] = {
            handler: mobileLayoutHandler,
            bound: true,
          };
        } catch (error) {
          console.debug("Mobile layout event not available:", error);
        }
      }
    }
  }, [isReady, editorId, getEditorInstance, setMobileLayouts]);

  // Cleanup function
  const cleanup = useCallback(async () => {
    const editor = getEditorInstance();
    if (editor) {
      // Safely unregister only events that were actually bound
      if (editor.events) {
        Object.entries(eventsRef.current).forEach(([eventName, meta]) => {
          const { handler, bound } = meta || {};
          if (bound && typeof handler === "function") {
            try {
              editor.events.off(eventName, handler);
            } catch (error) {
              console.debug(`Error removing ${eventName} event:`, error);
            }
          }
        });
      }

      // Destroy editor (safely handle different EditorJS versions and states)
      try {
        if (typeof editor.isReady?.then === "function") {
          await editor.isReady.catch(() => {});
        }
        if (typeof editor.destroy === "function") {
          editor.destroy();
        }
      } catch (error) {
        console.error("Error destroying editor:", error);
      }

      // Clear from Recoil state
      setEditors((prev) => {
        const newMap = new Map(prev);
        newMap.delete(editorId);
        return newMap;
      });

      setMobileLayouts((prev) => {
        const newMap = new Map(prev);
        newMap.delete(editorId);
        return newMap;
      });

      editorRef.current = null;
      eventsRef.current = {};
      setIsReady(false);
    }
  }, [editorId, getEditorInstance, setEditors, setMobileLayouts]);

  return {
    setEditorInstance,
    getEditorInstance,
    registerEvent,
    isReady,
    setIsReady,
    cleanup,
  };
}
