import { rgba } from 'polished'

const beige = '#eccaaf'
const black = '#231F20'
const blue = '#00C0F2'
const darkBlue = '#2B2B47'
const green = '#7AEFB2'
const pink = '#F83877'
const red = '#FF5C5C'
const orange = '#F8BF95'
const yellow = '#F8EB95'

const colors = {
  beiges: {
    2: '',
    5: '#f4f2f2',
    50: '#eccaaf',
  },
  blacks: {
    // background
    2: '',
    5: '#fbfbfb',
    6: '#f8f8f8',
    7: '#ebebeb',

    // pallete
    10: '#d8d8d8',
    20: '#bbb',
    40: '#6C6E6E',
    50: '#535454',
    90: '#231F20', // black
  },
  blues: {
    // background shades
    2: '',
    5: '#F4F6F9',

    // pallete
    10: '#CCF3FC',
    20: '#9DECFF',
    30: '#66DFFE',
    40: '#3CD7FF',
    50: '#00C0F2', // blue
    60: '#00ABD7',
    70: '#0298BF',
    80: '#00677F',
    90: '#003E4C',
  },
  darkBlues: {
    40: '#345d7e',
    50: '#2B2B47',
  },
  greens: {
    // background shades
    2: rgba('#CAF9E0', 0.5),
    5: '#CAF9E0',

    // pallete
    10: '#E2F9ED',
    20: '#CAF9E0',
    30: '#BBFFDC',
    40: '#A8F4CD',
    50: '#7AEFB2', // green
    60: '#4CEB98',
    70: '#1EE47C',
    80: '#128C4C',
    90: '#016631',
  },
  pinks: {
    // background
    2: '',
    5: '',

    // pallete
    10: '#FECBDC',
    20: '#FCAFC9',
    30: '#FA97B8',
    40: '#FA6999',
    50: '#F83877',
    60: '#F30856',
    70: '#C30645',
    80: '#94002F',
    90: '#610321',
  },
  reds: {
    // background
    2: '',
    5: rgba(red, 0.05),

    // pallete
    10: '#FFC4C5',
    20: '#FFB9BA',
    30: '#FFA7A9',
    40: '#FF8E8F',
    50: '#FF5C5C',
    60: '#FF2929',
    70: '#F40100',
    80: '#A00000',
    90: '#730000',
  },
  yellows: {
    // background
    2: '',
    5: rgba(yellow, 0.05),

    // pallete
    10: '#FFFBE1',
    20: '#FFF9CF',
    30: '#FFF7C0',
    40: '#F8EFB2',
    50: '#F8EB95',
    60: '#F5E165',
    70: '#F2D935',
    80: '#B59F0B',
    90: '#8C8115',
  },
  oranges: {
    // background
    2: '',
    5: rgba(orange, 0.05),

    // pallete
    10: '#FCE5D5',
    20: '#FBDBC5',
    30: '#FFD5B7',
    40: '#F9C9A5',
    50: '#F8BF95',
    60: '#F5A266',
    70: '#F28435',
    80: '#B5540C',
    90: '#8A3B00',
  },
  beige,
  black,
  blue,
  green,
  pink,
  red,
  orange,
  yellow,
  darkBlue,
}

colors.textColor = colors.black
colors.inputBorderColor = '#E2EEF0'
colors.inputBorderColorActive = '#2B2B47'
colors.borderWidth = 2

colors.circleButton = {
  bg: '#d2e8ec',
  bgActive: '#b2dfe6',
  bgDisabled: colors.blacks[7],
  color: '#b0ccd0',
  colorActive: '#91cad4',
  colorDisabled: colors.blacks[10],

  cta: {
    bg: green,
    bgActive: colors.greens[40],
    bgDisabled: colors.blacks[7],
    color: black,
    colorActive: black,
    colorDisabled: colors.blacks[10],
  },
}

const textColors = {
  blue: colors.blues[50],
  green: 'rgba(54,121,86,0.63)',
  pink: colors.pinks[50],
  red: colors.reds[60],
  orange: colors.oranges[60],
  yellow: colors.yellows[90],
  subtle: colors.blacks[20],
  subtleBlue: '#BBBFC5',
}

const paddings = {
  5: 5,
  10: 10,
  15: 15,
  20: 20,
  30: 30,
  40: 40,
  60: 60,
  80: 80,
  90: 90,
  100: 100,
}

const fontSizes = {
  30: 12,
  40: 14,
  50: 16,
  60: 18,
}

const fontWeights = {
  thin: 300,
  normal: 400,
  bold: 600,
  black: 700,
}

const fontStack = 'canada-type-gibson, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif'
const fontFamilies = {
  body: fontStack,
  heading: fontStack,
  monospace: 'Consolas, Monaco, "Courier New", monospace',
}

const shadows = {
  30: '0 0 4px 0 rgba(0,0,0,0.04)',
  50: '0 2px 6px 0 rgba(0,0,0,0.04)',
  55: '0 1px 6px 0 rgba(0,0,0,0.06)',
  60: '0 2px 15px 0 rgba(0,0,0,0.06)',
}

export default {
  colors,
  textColor: colors.textColor,
  textColors,
  paddings,
  padding: paddings[20],
  fontSizes,
  fontWeights,
  fontFamilies,
  shadows,
  borderRadius: 2,
  borderWidth: 2,
}
