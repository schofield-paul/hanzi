import pinyin_jyutping

# Initialize the object
p = pinyin_jyutping.PinyinJyutping()

# Translate to Pinyin with default settings
pinyin_result = p.pinyin('忘拿一些东西了')
print(pinyin_result)  # Outputs: 'wàng ná yīxiē dōngxī le'

# Translate with tone numbers
pinyin_with_tones = p.pinyin('忘拿一些东西了', tone_numbers=True)
print(pinyin_with_tones)  # Outputs: 'wang4 na2 yi1xie1 dong1xi1 le5'

# Translate with tone numbers and spaces between syllables
pinyin_with_spaces = p.pinyin('忘拿一些东西了', tone_numbers=True, spaces=True)
print(pinyin_with_spaces)  # Outputs: 'wang4 na2 yi1 xie1 dong1 xi1 le5'