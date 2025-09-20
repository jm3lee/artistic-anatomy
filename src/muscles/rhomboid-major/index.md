{% from "src/templates/macros.jinja" import summary %}

{{summary("rhmaj")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/1/14/Rhomboid_major_muscle_animation_small.gif?20121021030028" %}
{% set alt = "Rhomboid major muscle animation small" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Rhomboid_major_muscle_animation_small.gif'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Rhomboid_major_muscle_animation_small.gif" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=256
) }}

## References

- {{ linktitle('scapula') }}
- {{ linktitle('rhomboid-major-muscle-wikipedia') }}
