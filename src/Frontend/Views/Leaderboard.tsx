import { ArtifactRarity, Leaderboard } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spacer } from '../Components/CoreUI';
import { TwitterLink } from '../Components/Labels/Labels';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Red } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { RarityColors } from '../Styles/Colors';
import dfstyles from '../Styles/dfstyles';
import { useLeaderboard } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';
import { GenericErrorBoundary } from './GenericErrorBoundary';
import { Table } from './Table';

export function LeadboardDisplay() {
  const { leaderboard, error } = useLeaderboard();

  const errorMessage = 'Error Loading Leaderboard';

  return (
    <GenericErrorBoundary errorMessage={errorMessage}>
      {!leaderboard && !error && <LoadingSpinner initialText={'Loading Leaderboard...'} />}
      {leaderboard && <LeaderboardBody leaderboard={leaderboard} />}
      {error && <Red>{errorMessage}</Red>}
    </GenericErrorBoundary>
  );
}

function scoreToString(score?: number | null) {
  if (score === null || score === undefined) {
    return 'n/a';
  }
  score = Math.floor(score);
  if (score < 10000) {
    return score + '';
  }

  return score.toLocaleString();
}

// pass in either an address, or a twitter handle. this function will render the appropriate
// component
function playerToEntry(playerStr: string, color: string) {
  // if this is an address
  if (playerStr.startsWith('0x') && playerStr.length === 42) {
    return <TextPreview text={playerStr} focusedWidth={'250px'} unFocusedWidth={'250px'} />;
  }

  return <TwitterLink twitter={playerStr} color={color} />;
}

function getRankColor([rank, score]: [number, number | undefined]) {
  if (score === undefined || score === null) {
    return dfstyles.colors.subtext;
  }

  if (rank === 0) {
    return RarityColors[ArtifactRarity.Mythic];
  }

  if (rank === 1 || rank === 2) {
    return RarityColors[ArtifactRarity.Legendary];
  }

  if (rank >= 3 && rank <= 7) {
    return RarityColors[ArtifactRarity.Epic];
  }

  if (rank >= 8 && rank <= 16) {
    return RarityColors[ArtifactRarity.Rare];
  }

  if (rank >= 17 && rank <= 26) {
    return dfstyles.colors.dfgreen;
  }

  // if (rank >= 27 && rank <= 56) {
  //   return 'white';
  // }

  return dfstyles.colors.subtext;
}

function LeaderboardTable({ rows }: { rows: Array<[string, string | undefined, number | undefined]> }) {
  return (
    <TableContainer>
      <Table
        alignments={['r', 'l',  'l', 'r']}
        headers={[
          <Cell key='place'>place</Cell>,
          <Cell style={{textAlign: 'center'}} key='player'>player</Cell>,
          <Cell key='twitter'>twitter</Cell>,
          <Cell key='score'>score</Cell>,
        ]}
        rows={rows}
        columns={[
          (row: [string, string, number], i) => (
            <Cell style={{ color: getRankColor([i, row[2]]) }}>
              {row[2] === undefined || row[2] === null ? 'unranked' : i + 1 + '.'}
            </Cell>
          ),
          (row: [string, string, number | undefined], i) => {
            const color = getRankColor([i, row[2]]);
            return <Cell style={{ color }}>
              <TextPreview text={row[0]} focusedWidth={'250px'} unFocusedWidth={'250px'} />
            </Cell>;
          },
          (row: [string, string, number | undefined], i) => {
            const color = getRankColor([i, row[2]]);
            return (
              <Cell style={{ color }}>
                <TwitterLink twitter={row[1]} color={color} />
              </Cell>
              )

          },
          (row: [string, string, number], i) => {
            return (
              <Cell style={{ color: getRankColor([i, row[2]]) }}>{scoreToString(row[2])}</Cell>
            );
          },
        ]}
      />
    </TableContainer>
  );
}

// TODO: update this each round, or pull from contract constants
const roundEndTimestamp = '2022-05-05T13:00:00.000Z';
const roundEndTime = new Date(roundEndTimestamp).getTime();

function CountDown() {
  const [str, setStr] = useState('');

  const update = () => {
    const timeUntilEndms = roundEndTime - new Date().getTime();
    if (timeUntilEndms <= 0) {
      setStr('yes');
    } else {
      setStr(formatDuration(timeUntilEndms));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 499);

    update();

    return () => clearInterval(interval);
  }, []);

  return <>{str}</>;
}

function LeaderboardBody({ leaderboard }: { leaderboard: Leaderboard }) {
  const rankedPlayers = leaderboard.entries.filter(
    (entry) => entry.score !== undefined && entry.score > 0
  );

  leaderboard.entries.sort((a, b) => {
    if (typeof a.score !== 'number' && typeof b.score !== 'number') {
      return 0;
    } else if (typeof a.score !== 'number') {
      return 1;
    } else if (typeof b.score !== 'number') {
      return -1;
    }

    return b.score - a.score;
  });

  const rows: [string, string | undefined, number | undefined][] = leaderboard.entries.map((entry) => {
    // if (typeof entry.twitter === 'string') {
    //   return [entry.twitter, entry.score];
    // }
    // if (entry.twitter == null) {
    //   entry.twitter = 'N/A'
    // }

    return [entry.ethAddress, entry.twitter, entry.score];
  });

  const exportRank = () => {
    console.log(rows)
    let csvContent = 'Rank,Address,Twitter,Score\n'
    csvContent = rows.map((r, i) => [i+1, ...r].join(',')).join('\n')

    let link = document.createElement('a')
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent))
    link.setAttribute('download', 'leaderboard.csv')
    link.click()
  }

  return (
    <div>
      <Title>Leader Board</Title>
      <StatsTableContainer>
        <StatsTable>
          <tbody>
            <tr>
              <td>round complete</td>
              <td>
                <CountDown />
              </td>
            </tr>
            <tr>
              <td>players</td>
              <td>{leaderboard.entries.length}</td>
            </tr>
            <tr>
              <td>ranked players</td>
              <td>{rankedPlayers.length}</td>
            </tr>
          </tbody>
        </StatsTable>
      </StatsTableContainer>
      <Spacer height={8} />
      <TextRight onClick={exportRank}>Export</TextRight>
      <LeaderboardTable rows={rows} />
    </div>
  );
}

const Cell = styled.div`
  padding: 4px 8px;
  color: ${dfstyles.colors.text};
`;

const TableContainer = styled.div`
  display: inline-block;
  border-radius: 2px 2px 0 0px;
  border-bottom: none;
  padding: 16px;
  max-width: 100vw;
  overflow: scroll;
`;

const StatsTableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${dfstyles.colors.text};
`;

const StatsTable = styled.table`
  td {
    padding: 4px 8px;

    &:first-child {
      text-align: right;
      color: ${dfstyles.colors.subtext};
    }

    &:last-child {
      text-align: left;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  padding: 4px 8px;
  color: ${dfstyles.colors.text};
`;

const TextRight = styled.div`
  text-align: right;
  color: ${dfstyles.colors.text};
  cursor: pointer;
  width: fit-content;
  margin: 0 0 0 auto;
`
