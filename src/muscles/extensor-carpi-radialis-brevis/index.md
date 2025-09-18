{% from "src/templates/macros.jinja" import summary, translations %}

## Summary

<div class="card mb-3">
<div class="row g-0 flex-column flex-md-row">
<!-- Image -->
<div class="col-md-4 d-flex align-items-center">
{% with fig = pie.yaml.read_yaml("./src/muscles/extensor-carpi-radialis-brevis/fig1.yml") %}
{% include "src/templates/figure.md.jinja" %}
{% endwith %}
</div>

<!-- Content -->
<div class="col-md-8">
<div class="card-body">
<p class="card-text">
{{summary("extensor-carpi-radialis-brevis")}}
</p>
</div>
</div>
</div>
</div>

The extensor carpi radialis brevis sits deep to the
{{ link('extensor-carpi-radialis-longus') }} near the lateral elbow. Its short
muscle belly springs from the common extensor tendon and quickly becomes a flat
tendon that tracks along the dorsal radius to the base of the third metacarpal.

Working with {{ link('extensor-carpi-radialis-longus') }}
it produces clean wrist extension, while the pair balances the
{{ link('extensor-carpi-ulnaris') }} to keep the hand level during gripping.
When the fingers flex powerfully, the extensor carpi radialis brevis fires to
lock the carpus so the flexors can deliver force through the knuckles.

The muscle is innervated by the deep branch of the radial nerve. Chronic strain
at its origin is a hallmark of lateral epicondylitis, so accenting its tension
helps sell tennis-elbow poses in figure drawing.

{{translations('extensor-carpi-radialis-brevis')}}

## Related Muscles

* {{ link('extensor-carpi-radialis-longus') }}
* {{ link('extensor-carpi-ulnaris') }}
* {{ link('brachioradialis') }}
* {{ link('flexor-carpi-radialis') }}

## References

* [Wikipedia][ecrb-wikipedia]
* [TGB 5th](../resources/trail-guide-to-the-body-flashcards.html)

[ecrb-wikipedia]:
  https://en.wikipedia.org/wiki/Extensor_carpi_radialis_brevis_muscle
