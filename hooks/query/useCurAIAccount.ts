import { useEffect, useState, useCallback } from "react";
import { useAddressAI } from "./useAddressAI";

export const useCurAIAccount = () => {
  const { addressAI } = useAddressAI();
  const [accountData, setAccountData] = useState<{
    curAvatar: string;
    curName: string;
    isLoading: boolean;
    error: string | null;
  }>({
    curAvatar: "",
    curName: "",
    isLoading: false,
    error: null
  });

  const fetchAccountData = useCallback(async () => {
    if (!addressAI) {
      setAccountData({
        curAvatar: "",
        curName: "",
        isLoading: false,
        error: null
      });
      return;
    }

    setAccountData(prev => ({ ...prev, isLoading: true, error: null }));
  }, [addressAI]);

  useEffect(() => {
    fetchAccountData();
  }, [fetchAccountData]);

  return {
    curAddressAI: addressAI,
    curAvatarAI: "/default-avatar.svg",
    isLoadingAI: accountData.isLoading,
    errorAI: accountData.error,
    refetchAI: fetchAccountData
  };
};