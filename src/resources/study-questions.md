<style>
ol {
  margin-bottom: 1em;
}
</style>

{% from "src/templates/multiple_choice.jinja" import render_mc %}

## Key Terms
{#{render_mc("src/study/key-terms.json")}#}

## Rotator Cuff
{#{render_mc("src/study/rotator-cuff.json")}#}

## Deltoid
{#{render_mc("src/study/deltoid.json")}#}

## Triceps
{#{render_mc("src/study/triceps.json")}#}
