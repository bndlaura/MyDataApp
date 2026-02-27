import { useEffect } from "react";
import { supabase } from "./api/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setInitializing } from "./redux/slices/authSlice";
import Router from "./router";

export default function App() {
  const dispatch = useDispatch();
  // Track auth initialization state to prevent flash of unauthenticated content
  const initializing = useSelector((state) => state.auth.initializing);

  // On app load, check for existing session and set user state
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user) {
        dispatch(setUser(data.session.user));
      }

      dispatch(setInitializing(false)); 
    }

    loadSession();
  }, [dispatch]);

  // Show loading state while checking auth session
  if (initializing) {
    return (
      <div className="loading-text">
        Loading...
      </div>
    );
  }

  return <Router />;
}
