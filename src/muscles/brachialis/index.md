{% from "src/templates/macros.jinja" import summary, figure %}

{{summary("brachialis")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Brachialis_muscle11.png/512px-Brachialis_muscle11.png?20130728101800" %}
{% set alt = "Brachialis muscle11" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Brachialis_muscle11.png'>Anatomography</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Brachialis_muscle11.png" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

## References

- {{ linktitle('brachialis-muscle-wikipedia') }}
- {{ linktitle('gf') }}, 166-67
