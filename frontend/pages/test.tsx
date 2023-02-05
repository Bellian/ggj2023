import { Inter } from '@next/font/google';
import PlayingField from '@/components/PlayingField/PlayingField';
import testData from '../stores/playingFieldExample.data';
import Toolbar from '@/components/Toolbar/Toolbar';
import BuildField from '@/components/BuildField/BuildField';
import Controller from '@/components/Controller/Controller';

const inter = Inter({ subsets: ['latin'] });

export default function Test() {
  return (
    <>
      {/*<>
      <PlayingField
        spriteData={testData}
        elementSize={{ width: 20, height: 20 }}
        playingFieldWidthAmountElements={10}
      ></PlayingField>
      <BuildField></BuildField>
  </>*/}
      <Controller />
    </>
  );
}
