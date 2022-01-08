import React, { useState } from "react";
import { Box, makeStyles, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Token } from "../Main";
import { WalletBalance } from "./WalletBalance";
import { StakeForm } from "./StakeForm";

interface YourWalletProps {
  supportedTokens: Array<Token>;
}

const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
  },
  header: {
    color: "white",
  },
}));

const YourWallet = ({ supportedTokens }: YourWalletProps) => {
  const classes = useStyles();
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(Number(newValue));
  };

  return (
    <Box>
      <h1 className={classes.header}>Your Wallet</h1>
      <Box className={classes.box}>
        <TabContext value={selectedTokenIndex.toString()}>
          <TabList onChange={handleChange} aria-label="Stake form tabs">
            {supportedTokens.map((token, index) => (
              <Tab label={token.name} value={index.toString()} key={index} />
            ))}
          </TabList>
          {supportedTokens.map((token, index) => (
            <TabPanel value={index.toString()} key={index}>
              <div className={classes.tabContent}>
                <WalletBalance token={token} />
                <StakeForm token={supportedTokens[selectedTokenIndex]} />
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  );
};

export default YourWallet;