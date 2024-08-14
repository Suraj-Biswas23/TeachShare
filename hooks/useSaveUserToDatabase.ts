import { useUser, useSession } from "@clerk/nextjs";
import { useEffect, useState, useRef, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

type SaveStatus = 'saving' | 'success' | 'error' | null;

interface IUser {
  clerkId: string;
  name: string;
  email: string;
  role: 'student' | 'educator';
  university: string;
  department: string;
  bio?: string;
}

export function useSaveUserToDatabase(): SaveStatus {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef<boolean>(false);
  const { toast } = useToast();

  const checkUserExists = useCallback(async (clerkId: string) => {
    try {
      const response = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clerkId }),
      });

      if (!response.ok) {
        throw new Error('Failed to check user');
      }

      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking user in DB:', error instanceof Error ? error.message : String(error));
      return false;
    }
  }, []);

  const saveUserToDatabase = useCallback(async (user: any) => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setSaveStatus('saving');

    try {
      const userData: Partial<IUser> = {
        clerkId: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        role: 'student', // Default role, you might want to ask the user to choose
        university: 'Christ', // You might want to ask the user for this information
        department: 'Computer Science', // You might want to ask the user for this information
      };

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to save user');
      }

      const data = await response.json();
      console.log('User successfully registered in DB:', data.user);
      setSaveStatus('success');
      localStorage.setItem('userRegistered', user.id);
      toast({
        title: "Registered Successfully",
        description: "Welcome to TeachShare!",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error saving user to DB:', error instanceof Error ? error.message : String(error));
      setSaveStatus('error');
      toast({
        title: "Error",
        description: "Error syncing user data. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      isSavingRef.current = false;
    }
  }, [toast]);

  useEffect(() => {
    const registerUser = async () => {
      if (isUserLoaded && isSessionLoaded && user && session) {
        const hasRegistered = localStorage.getItem('userRegistered');
        if (!hasRegistered || hasRegistered !== user.id) {
          const userExists = await checkUserExists(user.id);
          if (!userExists) {
            if (saveTimeoutRef.current) {
              clearTimeout(saveTimeoutRef.current);
            }
            saveTimeoutRef.current = setTimeout(() => {
              saveUserToDatabase(user);
            }, 1000);
          } else {
            localStorage.setItem('userRegistered', user.id);
          }
        }
      }
    };

    registerUser();

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [isUserLoaded, isSessionLoaded, user, session, saveUserToDatabase, checkUserExists]);

  return saveStatus;
}
