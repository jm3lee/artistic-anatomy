{% from "templates/figure.jinja" import figure %}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Skeletal_pelvis-pubis.svg/512px-Skeletal_pelvis-pubis.svg.png?20140915114408" %}
{% set alt = "Skeletal pelvis-pubis" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Skeletal_pelvis-pubis.svg'>Fred the Oyster</a>, <a href='https://creativecommons.org/licenses/by-sa/4.0'>CC BY-SA 4.0</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Skeletal_pelvis-pubis.svg" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

1. Sacrum
2. Ilium
3. Ischium
4. Pubis:
   a. Body of pubic bone
   b. Superior pubic ramus
   c. Inferior pubic ramus
   d. Pubic tubercle
5. Pubic symphisis
6. Acetabulum
7. Obturator foramen
8. Coccyx

Red dotted line = Linea terminalis
