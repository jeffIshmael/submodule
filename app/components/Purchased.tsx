"use client";

import React, { useEffect } from "react";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import { useAccount, useReadContract } from "wagmi";

// QmXag5aDfyfSxMyqPvV5vP9sL2EtpJab99EXCfAvgX8G2B

const Purchased = () => {
  const { address } = useAccount();

  const { data } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getBuyer",
    args: [address],});

    interface Result {
      buyerAdd: string;
      buyerId: number;
      carbonIds: [];
      category: string;
      compName: string;
      description: string;
      email: string;
      phoneNo: number;
      regPin: number;
    }
  const result = (data as Result) || {};
  
  const { data:carbons } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "myCredits",
    args: [result.carbonIds],
  });
  console.log(carbons);

  interface Credit {
    buyerAdd: string;
    estAmount: number;
    ipfsHash: string;
    proposalId: number;
    timestamp: number;
  }

  const credits = (carbons as Credit[]) || [];



  const getDate = (Timestamp: number) => {
    const FormattedDate = new Date(Timestamp * 1000).toLocaleString();
    return FormattedDate;
  }
  

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    console.log("Not yet");
  }, [data]);

  return (
    
    <div >
      <div>
        {credits.length === 0 && <div>No bought credits</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {credits.map((credit: Credit, index: number) => (
          <div
            key={index}
            className="rounded-lg p-2 shadow-lg flex flex-col bg-slate-300 items-center ml-1 "
          >
            <img
              src={`https://ipfs.io/ipfs/QmXag5aDfyfSxMyqPvV5vP9sL2EtpJab99EXCfAvgX8G2B/${(
                Number(credit.estAmount) /
                10 ** 18
              ).toString()}.png`}
              width={250}
              height={250}
              alt="cert"
              className="mb-4"
            />
            <p className="text-lg font-semibold">
              {Number(credit.estAmount) / 10 ** 18} carbon credits
            </p>
            <h3 className="text-gray-500">{getDate(Number(credit.timestamp))}</h3>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Purchased;