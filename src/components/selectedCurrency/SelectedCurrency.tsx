/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Box } from '../box/Box';
import { Image } from '../image/Image';
import { TextInput } from '../form/TextInput';
import { H4, H2, H5 } from '../typography/Heading';
import { Grid } from '../grid/Grid';
import { Button } from '../button/Button';
import { Copy } from '../typography/Copy';
import { CurrencyModel } from '../../models/CurrencyModel';

const ImageContainer = styled(Box)`
  width: 20%;
  margin: 24px auto;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelContainer = styled(Box)`
  flex-basis: 50%;
`;

const ConvertAmountContainer = styled(Box)`
  flex-basis: 50%;
`;

const StyledGrid = styled(Grid)``;

const NewsContainer = styled(Box)`
  background-color: ${({ theme }) => theme.primaryNavy};
  margin: 16px 32px;
  width: calc(100% - 64px);
  border-radius: 5px;
  padding: 16px;
  transition: all 0.4s;
  box-shadow: 0 0 0px #e1e1e1;

  &:hover {
    box-shadow: 0 0 5px #e1e1e1;
  }
`;

const NewsCopy = styled(Copy)`
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.lightgrey};
`;

const SelectedCurrency: React.FC<Props> = ({
  news,
  currencyPick,
  convertAmount,
  showHeadlines,
  onHideHeadlines,
  onConvertAmountChange,
}): JSX.Element => {
  if (!currencyPick) {
    return null;
  }

  const renderNews = (headlines) => {
    return headlines.map((headline, index) => {
      return (
        <a
          href={headline.url}
          aria-label="link to news article"
          key={index.toString()}
        >
          <NewsContainer>
            <H5 color="#2d2d37">{headline?.name}</H5>
            <NewsCopy>{headline?.description}</NewsCopy>
          </NewsContainer>
        </a>
      );
    });
  };

  return (
    <>
      <ImageContainer>
        <Image src={currencyPick?.flagURL} alt={currencyPick.name} />
      </ImageContainer>
      <FlexContainer>
        <LabelContainer>
          <H4>
            Enter Amount: {currencyPick?.abbreviation} {currencyPick?.symbol}
          </H4>
        </LabelContainer>
        <ConvertAmountContainer>
          <TextInput
            type="number"
            id="convertAmount"
            value={convertAmount}
            onChange={(e) => onConvertAmountChange(e.target.value)}
            placeholder="0.0000"
          />
        </ConvertAmountContainer>
      </FlexContainer>
      <H2>Recent Headlines</H2>
      <StyledGrid>
        {showHeadlines
          ? news?.length
            ? renderNews(news)
            : 'No headlines at the moment.'
          : null}
      </StyledGrid>
      <Button primary onClick={onHideHeadlines}>
        {showHeadlines ? 'Hide Headlines' : 'Show Headlines'}
      </Button>
    </>
  );
};

interface Props {
  currencyPick?: CurrencyModel;
  convertAmount?: number;
  showHeadlines?: boolean;
  onHideHeadlines?: () => void;
  onConvertAmountChange?: (e: object) => void;
  news?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attr: string]: any;
  }[];
}

export default SelectedCurrency;
