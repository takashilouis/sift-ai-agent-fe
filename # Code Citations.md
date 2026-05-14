# Code Citations

## License: unknown
https://github.com/sla10132000a/kuikui/tree/d936bdc38b59fe619c9dff0b1f93635536e6dd56/frontend/Dockerfile

```
alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app
```

