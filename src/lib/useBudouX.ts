import { loadDefaultJapaneseParser } from 'budoux'
import React from 'react'; // 必要なReactをインポート
const parser = loadDefaultJapaneseParser()

export const useBudouX = () => {
  const parse = (text: string) => {
    return parser.parse(text).map((s, index) => React.createElement('span', { key: index }, s));
  }
  return {
    parse
  }
}
