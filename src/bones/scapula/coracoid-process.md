{% from "templates/summary.jinja" import summary_bones %}
{% from "templates/figure.jinja" import figure %}

{{summary_bones("coracoid-process")}}

## Illustrations

{% set src = "https://upload.wikimedia.org/wikipedia/commons/0/04/Coracoid_process_of_left_scapula_-_animation01.gif?20130524092809" %}
{% set alt = "Coracoid process of left scapula - animation01" %}
{% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Coracoid_process_of_left_scapula_-_animation01.gif'>BodyParts3D is made by DBCLS.</a>, <a href='https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en'>CC BY-SA 2.1 JP</a>, via Wikimedia Commons" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Coracoid_process_of_left_scapula_-_animation01.gif" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=256
) }}

## References

- {{ linktitle('acromion-process') }}
- {{ linktitle('scapula') }}
- [Wikipedia](https://en.wikipedia.org/wiki/Coracoid_process)
