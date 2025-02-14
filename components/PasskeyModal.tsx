'use client'
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { decryptKey, encryptKey } from '@/lib/utils';
import Cookies from "js-cookie";

function PasskeyModal() {
  const router = useRouter();
  const pathname = usePathname();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const encryptedKey = Cookies.get("accessKey");

    if (encryptedKey) {
      const accessKey = decryptKey(encryptedKey);
      
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY && pathname !== "/admin") {
        router.push('/admin'); 
      }
    }
  }, [router, pathname]);

  const validatePasskey = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        const encryptedKey = encryptKey(passkey);
        Cookies.set("accessKey", encryptedKey, { expires: 1, secure: true });

        if (pathname !== "/admin") {
          router.push("/admin");
        }
      } else {
        setError("Invalid Passkey, try again.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <AlertDialog open={true}> 
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Admin Access Verification
            <Image 
              src="/assets/icons/close.svg"
              height={20}
              width={20}
              alt="close"
              className='cursor-pointer'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className='shad-otp'>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} className='shad-otp-slot' index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={validatePasskey} 
            className={`shad-primary-btn w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Enter Admin Passkey"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PasskeyModal;
