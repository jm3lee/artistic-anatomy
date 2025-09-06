{% extends "src/templates/muscle.jinja" %}

{% block intro %}
The extensor digitorum lies in the posterior forearm and sends four thin
tendons to the back of the hand. Each tendon crosses the dorsal wrist and
inserts into the extensor expansions of digits two through five, allowing
them to straighten at the metacarpophalangeal joints.

It shares a common origin at the lateral epicondyle with
{{ link('extensor-carpi-ulnaris') }} and
{{ link('extensor-digiti-minimi') }}.
The muscle is an antagonist to the
{{ link('flexor-digitorum-superficialis') }} and
{{ link('flexor-digitorum-profundus') }}.
{% endblock %}

{% block references %}
* {{ linktitle('hc77') }}
  * **164**: Rubens. (B). Back view. Supination.
* [Wikipedia](https://en.wikipedia.org/wiki/Extensor_digitorum_muscle)
{% endblock %}
