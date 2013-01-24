/*App.ui.colors._default = [
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACBAESHwklQhQyWBs6ZiA+biJBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyRBcyTQwseSAAAAE3RSTlMAAAAAAAAAAAAAAQMTJEpng9vzJrf2pwAAAAZ0RVh0VGl0bGUAqO7SJwAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAAB3RFWHRFLW1haWwAfQib1QAAAAR0RVh0VVJMAHij0w8AAAGlSURBVGje1ZrNlsMgCEZZzC6CoO//rtOmTf/GdkzizTn91i33CBgVkJ8uJbWc3SNKiXDP2TT1/VM6fqMetaFwHQCYrG19Ydi0C/DR+o2xGWD/Wr8ybBNAO83PCF0NUK+r9DbgbUDyUleqeOoH2GrzM8J6AbluVO4CJK+b1XCT7EmennSSofYbBBkR3k+hfgZYHSB7D9AyAlD0HWCv/5txeACkQfZPhNQEeB0mbwFyHaj8F2B1qOwVkMpYQEkvAK+D5c8ALaMBy24QaAG3JVwAWgHpAyAIQNwBVhHZDRAMIBYAtIDLEoRJoXsinQBTUICYZgDmodlHAnpo9pFgOXTNI2F28X03C+mhs4+E9NDZR5IqqiTKAlSMBZhkFpB5gLMA5wHBAoIHFBZQeMD3x+D798H3f4vwzzV+4OBHJn7o89cW/OKFXx35yy9+fccfIPgTin8E4s9Y/iGOlxL4YghezuELUnhJjS8K4mVNvjDLl5b54jhe3ucbFHyLhW8S8W0uvlHHtxr5ZukB7V6+Yc233A8YGjhg7OGAwY0DRk8OGJ7ZPf7zC+rnOpcbiMFnAAAAAElFTkSuQmCC",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAALCABuSwDWkgD1pwD2qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qAD3qADFei+FAAAAF3RSTlMAAAAAAAAAABUnSmNykKXG2ujy+vz+/o2xqYcAAAAGdEVYdFRpdGxlAKju0icAAAAHdEVYdEF1dGhvcgCprsxIAAAADHRFWHREZXNjcmlwdGlvbgATCSEjAAAACnRFWHRDb3B5cmlnaHQArA/MOgAAAAd0RVh0RS1tYWlsAH0Im9UAAAAEdEVYdFVSTAB4o9MPAAABxUlEQVRo3r3a3W6DMAyG4Ug9iU3+CBW+/zsdY+pEV1gp5OU7bx+RQAh23G1XRLQLMeVSa8kphk5F9v3S7fn3kEd7yZiDNAC8xmKbKVH9KUBjb2/SRz0MaLZdyXoIkGS7k+RjQNJoH2TcJNYBiYN9mCHKfkCrHUjVvUC426Hcwy7AJzuc5N8Dku1EsrwDpNipFPkfODa9/031M6Cjnc6o24BUa5AqW8DZ8V+dhwXgszVK9qtAsmZJa0CwhgmvgN5bAnf9C7S5gVZupQcQrXHiMyBDa2CQJyBZ86QlIGN7YJQFAFzA4xJmQA2J/gKZAfIDgC7g5xIc8Qwsn4UJ8D0F9H4GsBGax8iBIzSP0QQUDijfgBgYmYBAAmECMgnkmyPWueWK59ApmCbBKQuo61igc4EFgossEF1igeQyC2RXWKC4ygKVB/AhwicZv03xBw1fKvDFDl+u8RcO/srEX/r8tgXfeOFbR37zi2/f8Q8Q/BOK/wjEP2P5D3G8lMAXQ/ByDl+QwktqfFEQL2vyhVm+tMwXx/HyPt+g4FssfJOIb3PxjTq+1cg3Sy9o9/INa77lfsGhgQuOPVxwcOOCoycXHJ45ffznC7l5ndumOLjRAAAAAElFTkSuQmCC",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnICKFbHPZsLvlucX0xdL4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydb4ydYo/RXEAAAAD3RSTlMAAAAAAAAAAAIUOU+C9+PHdgvaAAAABnRFWHRUaXRsZQCo7tInAAAAB3RFWHRBdXRob3IAqa7MSAAAAAx0RVh0RGVzY3JpcHRpb24AEwkhIwAAAAp0RVh0Q29weXJpZ2h0AKwPzDoAAAAHdEVYdEUtbWFpbAB9CJvVAAAABHRFWHRVUkwAeKPTDwAAAaJJREFUaN7tmslywzAIQDn0IpDQ//9tndZJ3EaKFZunmXTKKYeYNyzaAPkYkqRqOWf3UtyXH2aaxr6Ugf9o9toQzxoASB3tN0Y6BbBn2q8MOwzQXe0rQw8BRtXvIKQb2PqSdAMuHfWlviilg2gCzOsBcRsF5HpQ8hAgHda/ENI+QL2ekMd0klD9DcIvgJV6Uoo9A1gNEOsDtEQAivYAZ/3fjMMGkIL0L4TUBOQaJrkFCNS/JUhoAjVSSYID/BBoIRy0dZJEroDWahDIgJsJ3wCtgOgG4ATA7wDEgNUEwQxYTZD4NfZztQmTQvdEkshdtLWrChbiNcwCeujLR4Ll0JpHQnro4iMhPXTxkZAeuvhIUkUlibIAFXtzgElmAfkPAJwFOA8oLKDwgPePwf9C2wXgmx2+XeMHDn5k4oc+f23BL1741ZG//OLXd/wBgj+h+Ecg/ozlH+J4KYEvhuDlHL4ghZfU+KIgXtbkC7N8aZkvjuPlfb5BwbdY+CYR3+biG3V8q5Fvlk5o9/INa77lPmFoYMLYw4TBjQmjJxOGZ06P/3wCPLXIRFylAmoAAAAASUVORK5CYII=",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHCQkICgqv19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19ev19fxnunEAAAAFHRSTlMAAAAAAAAAAAAECTlle5294Pj7/ekW+dEAAAAGdEVYdFRpdGxlAKju0icAAAAHdEVYdEF1dGhvcgCprsxIAAAADHRFWHREZXNjcmlwdGlvbgATCSEjAAAACnRFWHRDb3B5cmlnaHQArA/MOgAAAAd0RVh0RS1tYWlsAH0Im9UAAAAEdEVYdFVSTAB4o9MPAAABs0lEQVRo3u2ay46DMAxFvZgNMnkg/P/fOkCnQ2kTGkgOUkfjJVJzmutLSOzIV1Goau+8D3EYYvDe9dODsl9KyeguWCKC0waATl20bESnXRVA/c7oPwyvpwEarCiCngKUDv8GIVlxRjsQY1YoyfhmsIMxZDyVBOjh4ReElgLcaKdidEUA9XY6EpmQGvOU2OkZoNGqIuo+4Fx691K9Beho1TFqHlD//1/nIA31T+ZBWvkn56UHgLdm4VMAZw3DvQJaGChlJWlqoISVhBDoUSRhJrBOQZo76MlJAmR4k+cbIBgQYQWoIaG/gMAAwh0ATeA2BWEstBppAnSRAsRuAWAKLRoJsEps1osJEDlAnAGgQrNGQio0ayTUW3Z/1wRVaNLoDwB6FtCLYwFOPAvwPCCwgCCRBUQZWMDAA3CJ8CR//nuALxX4Yvf/wXkLwD/6/LYF33jhW0d+84tv3/EDCH6E4g+B+DGWP4jjpQS+GIKXc/iCFF5S44uCeFmTL8zypWW+OI6X9/kGBd9i4ZtEfJuLb9TxrUa+WXpBu5dvWPMt9wsuDVxw7eGCixsXXD254PJM9fWfb9tBU4se8n6UAAAAAElFTkSuQmCC",
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAADAQQxEEJUHHFWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHRWHHTq5FX0AAAAEXRSTlMAAAAAAAMePWNyl6zO5vH8/ukfa+MAAAAGdEVYdFRpdGxlAKju0icAAAAHdEVYdEF1dGhvcgCprsxIAAAADHRFWHREZXNjcmlwdGlvbgATCSEjAAAACnRFWHRDb3B5cmlnaHQArA/MOgAAAAd0RVh0RS1tYWlsAH0Im9UAAAAEdEVYdFVSTAB4o9MPAAABvUlEQVRo3tWa6Y7DMAiE0UqBGOOD93/Z7bHbK0nrJJ5Ind+tvhqojwH6aRKLjEGjWc5mUcMowm3fpIbPSLDqE1UL0gEwiJovylSGXQDR5B+UVDYDxLxJJpsAEr1ZUVYDWKuvUFVeBWAtvlJlATELkOwblKUVEIpvUglNAFbfrJkwTQBsvkPGnwCSfJeSvAdsS++7VD8DpPpuVVkG7P/90zU8Ajh5FyWeB+yrn6VaegCod5POAYJ3VJgCpPQEFHkFcPauyvwCUO8sfQZw6Q0o/ATovoDbEqjbFrGwZVwB0QGKd4A4RHIDGAZg/wDQAq5LIEwJ3QvpBBgSCpCGCwAWoUuMCBihS4wIVkN/dUTICJ1jRH0PmunBQ8gInWNEXJGAygRNwSkJeMCIBYwUsIBAigUoRSwgkmEBhgdkLCDjAd+fA3iZwv9o8K0Cvtl9/3kAPzLhhz7+2gK/eMGvjvjLL/z6Dn+AwJ9Q+Ecg/BmLf4jDrQS8GQK3c/CGFNxSw5uCcFsTb8zirWW8OQ639/ENCnyLBd8kwre58I06fKsR3yw9oN2Lb1jjW+4HDA0cMPZwwODGAaMnBwzP7B7/+QVJTO20uflT7QAAAABJRU5ErkJggg=="
];*/