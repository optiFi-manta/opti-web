import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";

export const useCurAccount = () => {
  const { address: curAddress, isDisconnected } = useAccount();
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
    if (!curAddress || isDisconnected) {
      setAccountData({
        curAvatar: "",
        curName: "",
        isLoading: false,
        error: null
      });
      return;
    }

    setAccountData(prev => ({ ...prev, isLoading: true, error: null }));
  }, [curAddress, isDisconnected]);

  useEffect(() => {
    fetchAccountData();
  }, [fetchAccountData]);

  return {
    curAddress,
    curAvatar: "/default-avatar.svg",
    isDisconnected,
    isLoading: accountData.isLoading,
    error: accountData.error,
    refetch: fetchAccountData
  };
};