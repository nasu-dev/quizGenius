import React from 'react'; // 必要なReactをインポート
import { loadDefaultJapaneseParser } from 'budoux'

const parser = loadDefaultJapaneseParser()

export const useBudouX = () => {
  const parse = (text: string) => {
    return parser.parse(text).map((s, index) => React.createElement('span', { key: index }, s));
  }
  return {
    parse
  }
}
