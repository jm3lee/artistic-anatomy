{% from "src/templates/macros.jinja" import figure %}

[posespace.com](https://posespace.com) offers excellent reference photos. I own many of
them. Although I cannot share the photos here, I built an index to help me—and
others—study various poses. These photos also appear in a series of books titled
"Art Models."

## Art Models 2

Not an exhaustive list.

Has references inspired by:

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Bather_Allegrain_Louvre_MR1747.jpg/256px-Bather_Allegrain_Louvre_MR1747.jpg?20060805075533" %}
{% set alt = "Bather Allegrain Louvre MR1747" %}
{% set caption = "The Bather, Christophe-Gabriel Allegrain" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Bather_Allegrain_Louvre_MR1747.jpg" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=256
) }}

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Laoco%C3%B6n_and_his_sons_group.jpg/512px-Laoco%C3%B6n_and_his_sons_group.jpg?20240219224327" %}
{% set alt = "Laocoön and his sons group" %}
{% set caption = "Laocoön and His Sons (Laocoön)" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Laoco%C3%B6n_and_his_sons_group.jpg" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=512
) }}

{% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Statue_of_the_Emperor_Octavian_Augustus_as_Jupiter._Marquis_Campana_collection._1.jpg/256px-Statue_of_the_Emperor_Octavian_Augustus_as_Jupiter._Marquis_Campana_collection._1.jpg?20200330083941" %}
{% set alt = "Statue of the Emperor Octavian Augustus as Jupiter. Marquis Campana collection. 1" %}
{% set caption = "Statue of the Emperor Octavian Augustus as Jupiter" %}
{% set href = "https://commons.wikimedia.org/wiki/File:Statue_of_the_Emperor_Octavian_Augustus_as_Jupiter._Marquis_Campana_collection._1.jpg" %}
{{ figure(
    src=src,
    alt=alt,
    caption=caption,
    href=href,
    width=256
) }}
