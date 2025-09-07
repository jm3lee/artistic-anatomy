{% extends "src/templates/template.html.jinja" %}
{% block content %}
{% from "src/templates/macros.jinja" import figure %}

1. **Discobolos (Discus Thrower) by Myron** (c. 450 BC)

   [Wikipedia](https://en.wikipedia.org/wiki/Discobolus)

   [British Museum](https://www.britishmuseum.org/collection/object/G_1805-0703-43)

    {% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG/512px-Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG?20150319172504" %}
    {% set alt = "Discobolus in National Roman Museum Palazzo Massimo alle Terme" %}
    {% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG'>After Myron</a>, <a href='https://creativecommons.org/licenses/by-sa/4.0'>CC BY-SA 4.0</a>, via Wikimedia Commons" %}
    {% set href = "https://commons.wikimedia.org/wiki/File:Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG" %}
    {{ figure(
        src=src,
        alt=alt,
        caption=caption,
        href=href,
        width=512
    ) }}

2. **The Borghese Gladiator** (1st–2nd c. AD Roman copy of a 5th c. BC Greek bronze)

   [Wikipedia](https://en.wikipedia.org/wiki/Borghese_Gladiator)

    {% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Borghese_Gladiator%2C_Louvre_Museum%2C_Paris_2_October_2014.jpg/512px-Borghese_Gladiator%2C_Louvre_Museum%2C_Paris_2_October_2014.jpg?20150708204332" %}
    {% set alt = "Borghese Gladiator. Louvre, Paris" %}
    {% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Borghese_Gladiator,_Louvre_Museum,_Paris_2_October_2014.jpg'>Louvre Museum</a>, <a href='https://creativecommons.org/licenses/by/2.0'>CC BY 2.0</a>, via Wikimedia Commons" %}
    {% set href = "https://commons.wikimedia.org/wiki/File:Borghese_Gladiator,_Louvre_Museum,_Paris_2_October_2014.jpg" %}
    {{ figure(
        src=src,
        alt=alt,
        caption=caption,
        href=href,
        width=512
    ) }}

    {% set src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Three_Persons_Viewing_the_Gladiator_by_Candlelight.jpg/512px-Three_Persons_Viewing_the_Gladiator_by_Candlelight.jpg?20250418032139" %}
    {% set alt = "Three Persons Viewing the Gladiator by Candlelight (1765). Walker Art Gallery, Liverpool" %}
    {% set caption = "<a href='https://commons.wikimedia.org/wiki/File:Three_Persons_Viewing_the_Gladiator_by_Candlelight.jpg'>Joseph Wright of Derby</a>, Public domain, via Wikimedia Commons" %}
    {% set href = "https://commons.wikimedia.org/wiki/File:Three_Persons_Viewing_the_Gladiator_by_Candlelight.jpg" %}
    {{ figure(
        src=src,
        alt=alt,
        caption=caption,
        href=href,
        width=512
    ) }}
{% endblock %}
