import React, { useState } from "react";
import { Box, makeStyles, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Token } from "../Main";
import { Unstake } from "./Unstake";

interface TokenFarmContractProps {
  supportedTokens: Token[];
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
    margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(2),
  },
  header: {
    color: "white",
  },
}));
export const TokenFarmContract = ({
  supportedTokens,
}: TokenFarmContractProps) => {
  const classes = useStyles();
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(Number(newValue));
  };

  return (
    <Box>
      <h1 className={classes.header}>The Token Contract</h1>
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
                <Unstake token={token} />
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  );
};
