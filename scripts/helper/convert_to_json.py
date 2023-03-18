import pandas as pd

data = pd.read_csv('Artigos - artigos simplificado.tsv', sep='\t')
json = data.to_json(orient='records', lines=False, force_ascii=False)
with open('../../data/articles_tags.json', 'w', encoding="utf-8") as f:
    f.write(json)