{% from "templates/summary.jinja" import summary_bones %}
{% from "templates/figure.jinja" import figure %}

{{summary_bones("acromion-process")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/0/04/Acromion_of_left_scapula_-_animation01.gif?20130527164605" %}
{% set alt = "Acromion of left scapula - animation01" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Acromion_of_left_scapula_-_animation01.gif'>BodyParts3D is made by DBCLS.</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Acromion_of_left_scapula_-_animation01.gif" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=256
) }}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Acromion)
* {{ linktitle('gf') }}
  * Acromial angle, 19
  * Acromioclavicular joint, 46–48
  * Acromion, 19
