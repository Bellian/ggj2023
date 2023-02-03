import { Inter } from '@next/font/google';
import PlayingField from '@/components/PlayingField/PlayingField';
import testData from '../stores/playingFieldExample.data';

const inter = Inter({ subsets: ['latin'] });

export default function Test() {
  return (
    <>
      <PlayingField
        spriteData={testData}
        elementSize={{ width: 20, height: 20 }}
        playingFieldWidthAmountElements={10}
      ></PlayingField>
      <h1>Master</h1>
    </>
  );
}
