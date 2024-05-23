# PONG

This is my take on the classic game Pong. Built as an introduction into simple web games with graphics.

## Intentional Design Decisions

- The magnitude of the ball's velocity is constant
- The direction of the bounce on the padels entirely depends where on the padel the ball lands

## Future improvements

1. Add bounce mechanic for ball when hitting top or bottom of padels (currently only supports bouncing off the inner facing side)
2. Add a start button
3. Increase speed of ball (to until some max value) after consecutive wall bounces

## Known bugs

- Because the top and bottom of the padles currently don't registers hits, it appears as though the padel can pass through the ball (or vice versa) if the padel is moved to the ball's positions whilst the ball is directly above/below the padel
- If the ball bounces between a padel and the border very closely, the ball can get trapped on the canvas border and then move along it until out of bounds. I haven't investigated why this happens exactly or potential fixes
