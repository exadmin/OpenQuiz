simpleQuiz.shell = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            main_html: String()
            + '<div class="simple-quiz-shell-head simple-quiz-shell-hidden">'
            + '<div class="simple-quiz-shell-head-logo"><img src="img/butterfly.png"/></div>'
            + '<div class="simple-quiz-shell-title"><h2>Онлайн Викторина</h2></div>'
            + '<div class="simple-quiz-shell-name"><h2>Имя игрока: <span id="player">Тестовый игрок</span></h2>' + '</div>'
            + '</div>'
            + '<div class="simple-quiz-shell-main simple-quiz-shell-hidden">'
            + '<div class="simple-quiz-shell-main-question">'
            + '<div class="simple-quiz-shell-main-question-title">'
            + '<h1>Вопрос №<span id="questionNumber">1</span></h1>'
            + '</div>'
            + '<img id="question" ondragstart="return false;" ondrop="return false" class="simple-quiz-shell-main-question-img" '
            + 'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAEiCAIAAAC5tAa0AABLa0lEQVR42u19f2ReyRr/ZVVFVJRYsSIixKqKqlAVVRWhVlXUClERFRWiroirQtQVUVe5qmrVWq6qqqhQsaqqSlWsuiJU1aqoEqsqIsKKqIr1fj83z3ef73znnDPznB9p0uzn88frvOedM/PMM8985pk5887ztxpBEATxBeJvVAFBEATpmyAIgiB9EwRBEKRvgiCIvUnff4thD1S1oaHh999/xwU+Dxw4wLanZgiC9P1lYGho6MqVK7iYmJjANduemiGIvUPf6Sn2Cn2vrKycPHly37593d3duGbbUzMEQfomCIIgdj19f/z48Z///GdzczOcNXxiuo074TIsj4RXbJLi5ZLKSzwwMBAek8Lp5+bm4KXW1dWhrMOHD9+8eTOkXwdfffXV/v3729raxsfHXfE2NzenpqZwHxk2NTWlCv/p06eLFy/i8fr6+pGRkbW1NbcUfB0dHW1sbESCEydO/Pe//zXWJa9mUrGwsIBCIXxDQwNkW11dDTer5l/AlgI1jRZntJNwY+WVuaRIwA8//NDR0YFfU3OIyhxt4vIS2s3PREnb0Aqk7//hjz/+wCzba+ZTp07hflYBxkfK0He0CDfx8vIybMJO317658+fJ+WEJeXtvYODg5rmu+++iwoPWnQTdHZ2agIYLrq3++uBAwfevXtnqXtezSSxtLQE1nZLP3r0KAabKDUUsKVwTaNMZLSTQGMVkLmkSP/617/COURljjZxSQnt5leAvqtqBdL3/3UEcP3NN9/IAIvPr7/+GndwP6sAyyNwP3EH/mwWX4fpO1qEm3hyclIdGQt9e+nBTbjATVgtzOXRo0ee5GFHHrz2888/u4/cvXsXX+Gz/Prrr/gKu+/p6cGdW7duuTmAIh8/fpxau+vXr+ProUOH8Czy7+/vx9fh4WFL3fNqJgkUhPTnz59H0SsrK6dPn8bXGzduRJfgCthSuKbV2klqYxWQuaRImI3hKyquI6KXQ1TmaBOXlNBufrnou9pWIH3/DxjicH3v3j39dXp6WtgnqwDLI3AKcAeToGL0HS3C9fhQyoULF4z0HU6PX2dnZ8V2jbaIR0S2Y8eOua73b7/9pmk+fPiAO93d3W4OyuYAaoo7YHm3+kLuALLCVxi0pS55NZOE9Jz379+7pavwgRYsbEtZNa3QTrIaq4DMJUUStg3kGZU52sQlJTSaX2H6rqQVSN//AwZAWYd1x8aw+2l5RHzYc+fOhek7a34XLUIT379/HxcLCwtG+g6kVxlAoy75WmaCqClGLEmAmWZqGt1/LV9lX7ZbO00g1c+aOYbrklczxjlvfX19lMUK21J0paKw9UYbq4DMJUWS2czly5dVhlT6DsgcbeKSElrMT4ChCEbb19c3Pz+fd/GkZCuQvv8HWThLJkDDZBVgeQRzbdyRrccF6DtahCbG+Hz8+PGoU2BJv3//frl58ODBgDmmig3f5NWrV67wSSSFz6pdavWNdcmrGfsbpyiLVWVLdq402km0sXLJXFKkxcVFmd/kWvt2ZY42cUkJLeaXxMOHD0t2mVytQPreRu/7zJkzuDM3N1ds8cToVaH58Xnnzh0jfUfTw+OQN0udnZ32hbypqSncOXnypCv85uZmOIdk7XJ531l1yauZKEQ2jG1frvcdbazP6X0D6+vr8L7D9B2QOdrEn8H7Ttbl22+/Ldll6H3npu/u7m5v1UnWYQOrTtFH3r9/j+HUa85cFhYtQjdvNDY2ip1Z6NuYPpWtApJ7j8g79Onp6XAOmPnqHXRC3Dl79qx8hUuFr0+ePHFfJHiLj1l1yauZJOTd2ocPH+QrxMDXI0eORPVQwJbCNZVSPMe/gJ0EGquAzCVNt7a1LxPE1N7e/vbt2+jad1LmaBOXVJrF/DynJ+98pXwrkL7/B3nnix4r73xfvHghvTe500ARfUTepczOzham72gRkhjNrzv8LPSdmh69CBfXrl3DgA9DnJycxNeWlha7KyEOe1tbmys8zP3p06e1rVNHrly5knx1qe/ZkUxm00roEEa262Eg/Pjx4/nz5/H10qVLlrrn1UwSf//732XnCYpG18VExFsHy8q2gC2Fa4qbyaG0gJ1EGyuXzCVNF9OyQ4cOgV5lY1KUvpMyh5u4vNIs5qc5w0ImJibyet/lW4H0/X9HzuSOSwx6gbl/+JG/GVArtO/blUoXZPUdo4W+U9Pfvn07KWHgnztZlVJTSxX+wIEDr1+/dnMQH0ehrndta+Mterj7K/ws3QoSrntUM1E2h9/tLc7iq/vPnYAXlteWAjXVO9rJC9tJ3sYKy1zSdMG5uDM1NZWVQ1TmQBNXojSL+SUxMzNTbZcJtwLp+/91ofHxcTiDmP60trbC/XQXobJ6XdYjldB3VCpJ/P333xtZKZweltfV1QWHBV3iyJEjIHTjCz2ZM+IRdxdg7c+/kMGvR4Yg7v7+/jdv3ng5rKys9Pb2IkFzczM6s7fUiF+Hh4fr6+uRAG578vGsukQ1Y3HGFxcXT58+LQo5deqUW3o4nwK2lFXTuro63IEOZRLjvmF2XUuLnUQbK5fMZUwXHjcq1dHRkfofN6PMgSauRGkW81MgWyR49OhR+S6T13L2Mn3vWPF5/rz+18TOKgEezV/wjRBBkL5J3188fd+8edN13AiCIH2nT9Ny/Ur6/gzgEbIEQfomtmWEIwiC9E0QBEGQvgmCIAjSN0EQBEH6JgiCIH0TBEEQpG9iB9HQ0CDnieNTDzLcYyWWwdOnT/v7+yHn/v37z5w5c+/evcDfIAvcrP359yg5Nq/wn7+j/14mSN/EXsPQ0JAcMjUxMYHrPVliYWhsXxft7e0vXryokL4lXkzydEnSN0H6JkJYWVk5efLkvn37PtufdD5/icUg5yl+/fXXP/3008bGRm3riD65CWd8cXGxKvqWI+8xknnnkRWgb9oz6Zsg/up4/fq1BH7Tg7bd2QN+6u/vr4S+V1dX5bSyzc3NhoYGjGpra2ukb8JK316kq/3797e1tY2Pj3/8+NFN8OnTp4sXL+JX2PTIyIhnZDC+qakpPAj7a2pqwrxYH9cc8JO7bohrZOWZ3Q8//NDR0aEhsaOzv8AhhWGBZ2Zm4P3V1dWJwGNjY+vr6/KTdCc9IjnZN65evSphKgPzVmNZNcO5dJB8dHS0sbERdTlx4oScdJyacmFhobW1VQ/gl+MMm5ubUS4+UxsluVBgUXWqnZQsMayHMifkWCT3AIUjsWsDit9++w0+cviQdPvNH3/8ETcvXLiA6+HhYVzD2d8++g7YUi0WmDCvwRh7R3TBJy8nhO3w2LFjePbnn3/WxBJuV8bjktSxrWYcp28Xg4ODbgJUw/21s7PT5WIJmu7i1KlTmkBvusdFSnAWV2I5mj3X4l2AvgMCyzHzHtBgXp7axq4Mjx8/toQcVAnDZUXbG2YH2/UOBH/37l3qs5qylnEycrJR5Hp5eVkDb+ZdXVU7KVni56HvVMmTOHr0KBK4a9y5irbfBIdqwJpnz565gcEqp++wLeWib4vBVELfBTghbIdyEi+8HCH0jY0NXGM8k3PqS1LHjtG33sXIA9pKhgHEzA7Mha8YseWQfoyKkuDu3btyaLqEBYFB9PT04I4e1KtRYzQSh/gaLS0tbukSOOP69evJg5gLdJ6AwBJrWHYRABLCww2RLh0JfThZisSUkZxl2uGF2vNEipYVbm9oA9eHDh2CVqEW+Aj4CtUlU4rMKpgUpJF6kkpwn52cnFTvxqjqpJ2ULHG76TsgeRLSaoHQmpXQNxx5CXitBUkX0OgKeek7THNhW8rVBBaDsfSO6J0CnBC1Q4lp9Y9//APXEn5To6+Vp44dpm/IJK/CMctwE7iHpkt8OXC063q7Nvfhw4dk0C+YCwY6TQP9SrA0LV0MokzPNAqcmo8Xgg/DtcZQ1lLw1QusJ/H9MEGzt4FXVri9RQwlZenwqeEET2zBk9+NCijNmozuiBaH/F5bRFWdtJOSJX42+k5KXqYjlaHvq1eviq+nd+TVKFy87aDvsC3Zm8BoMMbeEb5TgBOidoiRoK2tDT643HdfF5enjl2xeHLu3Dmo3k0ge3W1/m68c1kITkITyFdZ5hMPfWFhAdcPHjxwJT59+jSuMR5q0WXoOyCwYH5+/v79+5gQyEzZy+fly5doFfyEfDRDfMVNPOgtnEFdYZECZYV7nSWYt3gBnmD22OoQDBfSInmXIFw7KVmiZeauL1HQlH19fVrfkpInIXWx7MIuQ9+ylPH8+XO9I/4B7m/H4knYluzUYzQYY+8I3ynACZZo9NC5Otoa3a0S6tg+M85B3xiTX716FbZFHXN0FSwZ68jNQdpbPAtMvvCUMqMkW1xc9GInGte+jTdVnpWVFdV7oBS0kPfCBFMnb2fujRs3vPi8XlbRssLtLbqNElNSsNQHk40ibvvx48eLkaBrJyVLtNu9i4cPH5aXPAlZPPXe7KnzPjMzg/llSfpG6QGXWeOdVkjfYVuy07fRYCy9I3qnACdE7dBdMxgbG6uWOrbPjK1r31NTU+4rFH0bmzUiRV0VdRLlfbe8GpL8vdLX19dlNao8fQcEllW/Q4cOofHAejCRZD7ouvX19RBydXVVY07iKyrrvtGSTbuyxpIqUrSssPlavG8RDNK6dGP0hYVE7ty5U2AF2bOTkiXmmnWqnUjY8pKSJyHLo3Aykj89ffpU/rxTkr7Hx8cD9D0xMbE7vW+7wVh6h+VOXk6weN9LS0uy7Q2cgOsKqWP7zNhE33pTAwUk/w+GxnPXjMRVmZ6ejpoFRjyMjbKpVkJoJ7e+QcvoG7rftjB9BwSW9w86RRJ5vB7e1taGZG4s89rWHzdk25k0ML6iOqL68KvLQFnh9pYw87IzQRcTk2vfnmC1rVg53gqgrOJ5K9EjIyONjY3SpYupWu2kZIl5Fw2Rg7pFJSVP4s2bNzKzdvu2vIuTnWdXr14tSd/y3j4Z3PnXX3/FffctUVX0HbYlyUR3nWY1gd1gLL0jWmgBTojaIdDT04NCZVuLO4qXp47tM2Or9y21Ahd4+0bEuYP3IdMZraS8fsVNiVqNuonz4r26xIV6Pboryy0dfQPDGtQq6+Ml6TsgsLTB7OysGIdugNHNoXC7XOfLe+euP8nbG8knTN+BssLtLRuVMFlBZ8Aj58+fx1fdwJMlmDZKU1OTKAHalpf4mM+6z0K88BbmgA/r2UnJEnPZPagH/mlh79uTPBWDg4NSndu3b8ugOD8/L6/F0Ii61bcYfSffgbvo6urynNZK6DtsS7iZHNKSTWA3GEvviBZagBOidig75WTnibSytzmqDHVsnxnnWPtO9joZuhXu69rUjZaYbuj6nYolrzKSbzXlGmahXnl5+g4ILH+cS0K2pcPhQiPB/VFP1i1FHfO/GRAtq2bY9w3zdR+E76MvW1IFk528qY0CvtA1Lv0bi24ZKrZ7Wu2kZIkWu09iZmamvOSpAEEnqyOkr/+Yr8UOG8ma8ss/dMAjqUWLx6c7Ugpvr/YKDdiSW7twExgNJpdOAoUW4ISwHa6srKDW6N0yAK+uroKg6+vrpdeUpI5tNWMTfcONP3LkiLt1RhdYe3t70XjNzc3QpreCJn9zwgRH/rLY39/vzgpVLGhQXiwk/3Ms2+k7OjosJ7pZ6Dsg8Nra2sDAAJgOlUVTQXeoLx5BevyKT+9/WV4psmvY2FfDZVnW/lAR9HZYGOqCCU2qYl3BNGc0yvj4OFwJFA17hWOe3DzrxpLPRYJJOylZYi67hz6hikCfySt5FhHAL4PHjcm7vLYB47s1KkbfyLahoUGXIJJAN8Gvuh+8KvoO2BIqiDvovzKBdueO3iKq0WAsqogWWowTwnbY19fn9W7Z/yYzoZLUsa1mnE7flczLdhU+j8AVbuEkiD2GL7R3fEHdlvRN+iYI9g7S91+vDdx5Zd5fCWJv4wvtHXuQvr84JiJ1EgSxt6mDU3uCIIgvEqRvgiAI0jdBEARB+iYIgiBI3wRBEKRvgtjFaGhokLOE8Okd0EwQpG+C2L0YGhqSo6UnJiZwTYUQpG+C+DIg557v27evu7sb11QIQfomCIIgdiV9R08piybY3Nycmppqa2uD49PU1ISpq55+W8t/fnmByJ5ygr57ipicTKvnGmY9mHUnXCMP4dJdjX311VcSVGF8fNzNcGZmBg5jXV2dFDc2NqbHSUf1H37W0nxyWmRzczNywGe4spY8vfxXV1dHRkYaGhpEwsuXLyfzj0bDymVjAwMDn/Pfz1FziraRh7m5OU1/+PDhmzdv5lUFfnLPycO1BJepsF9n6eHTp08XL16EnaNEtPva2pq9mZB4dHS0sbFRznf0gtWFDbV8R8tr2J/ZzLaLviVqnItTp06p9XwG+paDJVtbW6WpNjY2cA0jAHEU62/hGnkIl56lvcHBQXlcDtH3gA5g0X/02WjzpR6OHKhsXitHZ5aAvF7+eenbbmPLy8safHU30LeljVxoFF0XGiHBqAr3BGrgyZMnlffrLD2Ast1HOjs7jc2E7uOZyoEDB+QYbouhlu9ouQz785tZiL4D5hhOIKErMFRKOAyou6enB3f0POXPQN+1P4MTSgQNCR/nRkvK1d+iNUoiUHoy1Iucyq2R9yTyA9L/sQWJFQLPxSK25dlwZeURDS+CTwkvovFHCijQvf73v/8t4WkWFhZqW8Gl4BN5yoSX54Ui9PLPZWOTk5MaYHo30Le9fQUSCRe1AJ0hvczkVDlGVaBBNYxObSs6hMaF2b5eoLHbHz9+nGpL4Wa6fv26hJFEWegmElUSkhsNtZKOZjfsz29m20LfMkRrAA7gw4cPqZHStpW+JdYMxsPp6WkvQEbe/hatURKB0r2yYDeS5tixYwHxvKjYFm1kPRuurET/coc6ES8rjlfeVpPwLg8ePNCUs7OzuNPV1aV3JOgipsPhyZDFxqBe5CNhunbP4omxfZNAdURdUGMuVYD73GiZYL2kTirvBfK4y+8SZBK8b2kmMUWhfgBFu6E4o4ZaSUczGvaOmNm20DcmOKnTDS8cWng+YvkVikaefX198/PzqYLprBPjv4YTKzD3j9YoPOf1Sk/N6ty5c+As93FU6v79+/CYxPlKtYms++FnLZHsw2G5i9G3C42Xlpq/OJjQSVb+RhvDBfSAC3j6n5++w4s/lvbNyhb0pzRqVMWPP/6IT3GcRRsSU6bCfp0lsIbxrSXCtIebSUwxa3EmaqiVdDQjfe+ImW0LfesCUDIkVbX07eLhw4epgonLMDY2Vqa/RWuUhdTSU7OCT/Hq1StJsLKyopaU1fmzGsLyrKX58rqHeek7nP+NGzdwR7Zsp+ZvtDFcwBc7fvx4rbowjNFGiZqTvX09aDzVgwcPqstiVIUwy7Vr12Saj6fAqtX2a6N7YW+mVFP0bCCaecmOZqRvi5l9GfQto6LrXhWeaEd/XV9fl5Xl1MDMS0tL8nodoz2uC7NPtEapyCo9uSQ3NTWFOydPnpQ7ssaH2TF4H6P64uKinb4tz+6U9x3O33Xizpw54wVW9/I32hg6Kj7v3LmzI/SddcfevqmLJ//617/kBWAuVeBB2bwhi+libNX268DOk7D3ndVMlXjfJTuaxbCNZraL6BtDX1YCeR08PT39GehbDFqHXO9XzDEhp5i7tlkBkaI1SkVW6VkuiZ4KL06WTjlfv35tp2/Ls+Hm6+7u9pYUZb0yuvYdyDOZv6tMmcXrEur79++RlYzHWTU12tjIyIjG/91try4t7RvIX63F3t0wF4RipTiJ1F5tv84qGsyod8Bx7qugcDNJfPcnT564b0R07TtqqJV0NIth75SZFaFv9C5XBVlbF6BlCRcN7cg2jO14dYkWnZiYSPW+5UW57P0YHBwM752wbMYI1CiJQOlJp0Aovq2tzbWq2dlZWabUHQJZm6OT9B141th8TU1N8kL/xYsXuMadGzduZFU2mqd7LXG4m5ubZefJ/Pw8rt385f2PVCGrpkYbg0i6wW630belfQXt7e2y7gFTAUdMTk7K1p283U19T3yiWSvv11l60M0heFA2hyihh5tJNvZhrgDZoJzz58/jq+6fiRpq+Y5mNOydMrPc9K1zRlVB8pHU/ZiYLmFwq4q+k5iZmXFTrqysYDxsbW2VTfirq6uwm/r6et00mqu/RWvkIVx6VhXU7IaGhlITuPt2s8QOP1u4+eDRZM2aLXmm+s4uurq6JH/jeoXRxuA36Su+3UPf9vYV3L59O5lY/7lj727yQjj1zWEl/TpLD+JEK5K7sLKaCTQq+5QU6Fa6CyBqqCU7mt2wd8rMctN3XV0dZIU7ICOw6/S5Y5T8GwrJkBgN3N/f/+bNmwoXTxQoFIO/2r2m7Ovr8/73KDP0rBWA6HpRuEYewqUn3/wcOXLE3Vy1trY2MDCAquEnmD5GJvFYe3t7o2KHn7U33/j4OJwmZIJBCO6eu8KYXIKM5plUpuaPT1xvbGzYl6HtNvb9999Hd+l8fvq2t68CaTDC4RFUFtYCQnd/NXY38Jq87tP/Hlfbr7P0AG8GVcMjmGZhBuCuZUebCc8ODw/D9cHj6OlecWFDLdnR7Ia9U2aWTt8EsVOw7+snvvTWJEjfBOmbIH0TpG9ip+HN1nP9SpC+Sd8EQRDbPhgTpG+CIAiC9E0QBEH6JgiCIEjfBEEQBOmbIAiC9E0QRDV97/9HXV3dqVOnvP/7EQTpmyB2O30rnj9/TuUQpG+C2O30rV8/fvx46dKl1CDOBEH6JojdS9/C4MnTSgkiQt+eJS0sLLS2tsqZ5Ro+4+LFizCs+vr6kZGRtbU1/PT27Vs9d9vF0tIS7re3t9cMQbNSBRgYGAj/+3Zubq67u7uurm7fvn2HDx/WszQFMzMz+mtTU9PY2Jic45o1adXO889//rO5uRlP4XNiYsI9jjl6QuEPP/zQ0dGhkaeT9bXEhLNrIBoLJppgc3Nzamqqra1NtJSrvpVElz527Jh3TKMccKrH4wWqDOOENUL48fHxrFOzLa1mUUJeUylM3xDGjU4gQF8bHR1tbGyU0Dly1LVF/rzqjUqYpIWq9BNt2aosyiKYpVsF+mmuIE3bQt+gIe9cYFC2K0pnZ6ccAinxL7zVup9++knjFhag7+XlZQ2yl5pYIwK70NPT5cR3Dxh7wn0y9ShhTGP1rMswEcip8GX4NJcGKqFvCctZrL6V0Pevv/6KaoIRpAttbGzgGjy1urqaq8qDg4OF6duihLymUowcUX3pZW7AT2hGO6Met+0eYR+QP696oxImaaEq/URbthKLMgpmp+/UfrrD9P3s2TNcP3782P2poaFB7mDwl/AZEkrm4cOHuD5z5oybaW9vL26+fPmyZj7Cxk02OTmpPmxqYgk2imRoJKheBliNdycBNe7du/fHFiRCByYNgS5d+zOQh0YJ8aoZJQKJ+nH9+vXk6cMF/NmoBmqlw5NKbCB4cxKJHIzQ09ODO3o48megb0Cit0iIIglh6obCClcZqoafFY7JWbkSLKaSixw9gMFdNoFFSWxGyIb6SqjG4eFho/y51BvWnkcLAQ0X0E+0ZSuxKItgMgFyLSrQrVL7qSV45jbS94kteGW7R55LfDkYigxoLS0tGII0Mi/qjyrJykkB+kaGmNRI9CzLg0g/OzsrJh7I3I2NnZozBmHPuKenp8Nh9Nw70ophozRSnlEDJelbvDaNGAJ8+PBhm+LbBSRHR8U0GfYj2nbDskSrDEXJU5gyF9NSASVYTKUMfR8/ftyN1yxlKWlCVHd1JSp/LvWGtefRQkDDBfQTbdlKLMoimETXRAeMdqusfrpj9C2+Kphofn7eK1uDe9YSoaOvXr2Krxjo5CtMzZ0A5qXv+/fv42JhYcHyoBo9xhLXiGtbARWR1aVLl8RVD+u3Zg5inTUnOn36tCgBzV+Svo0aKEnfaL7U6nhRtcJLPZZfYU7Is6+vT43KE0yXwjDD07BYdr47d+6cq/NcS0xGJeQ1lWJLE8jk9u3bBw8exE3d/R2OvB6VP5d6syRMpYWAmRXQT7RlK7Eoi2AylUfR0W6V1U93jL7lrbcbJbqWHbxZ/dmVlRVcNzY2il5GR0elVsXoGyMhHBDjg7JOAsDotS0hj1K25eWDQNawAtUME8Hi4qJMxHKVm0rfRg2UpG9ds0vGl6qWvl08fPgwVTDxIsfGxgq4q1D7q1evitG3UQl5TaXwq0vgyZMnEqs3UJYnSUD+XOoNaC9JC4FaFNBPtGUrsSiLYDdu3PBeP2R1q6x+umP0DeI7efJkfX29+3Zbd55ked/6+lXC8bW3t7uBPnPRN1oLn3fu3LE/CNdAXht2dnbKHVkfPHToEBoPNgdirdD7DrTK+vq6rLWVoW+7BkrSt9Q3KxhxtYsnqhnZpOT9urS0BJMTi9IlOKO7qpHUi9WigBK2z/tOJZSw9x2VP5d6syRMpYXt8L4DLVuJRVkEO3PmDO6461ep3SrQT3dy7RtzDdm1o5WUn9yxF0J7i0ovXryQFTfxHcbHx4vR98jICLx4MdZcdXZ3y4pLrqs9r1+/ttC3bKFx18Vkid+49l3b2lYFO8Do9fbt26yGl01XAcqza8BC34Hi5BX89PT0Z6BvGWWVlbxfe3p6IKeMwQEiDkwEAxulw3IWUILFVMrQ95s3b2TWL18lZDu6lbsyq2vfUflzqTcgYZIWArUooJ9oy1ZiUVHBUE086O2ETmWPQD8N97ttf3U5OTkp+zrcn/R17dOnT2WVwJtMYboHoWXQSy6dGw0FraX7/wIPgiLx07Vr12BM0KAI3NLS4tL37OysUCruS1bhPaTyVrqpqUmqiQFJNpNgMmUhAnhA8PehAdkDkEwAy0gSTZLyjBqIyhMtTuqLppRlVox28sp+O15dgnQmJiZSfSXZOyH7BAYHB/PuT5Au6s72cmmpgBIsplKYvjHwCyMPDQ3JHdkFi86FBoUBnz9/Hl8vXbpklD+XesMSerQQqEUB/URbthKLigom7yGFOsL0ndVPo/1u2+lbXt1CAtleqi/E3QWB5CvsH3/8UX5qbW0tILru2Nc3kIEHb9++nVyj0H/uwPRTl8kePXoUyDl1TyiGZZ2ZhokAbYlrzPhSE2iGHtEkKc+ogbA8luJS64vJJiYrVdF3EjMzM25KzMrhwsBg5E9Vq6urYCJ4AO6+ZstCtp0XyivBYipGs8+qzsGDB3XKD8qGW+D+Co3p67iw/FH1RoUM0EKgphb95G3ZSiwqLNjfDAj3U0u/23b6BmTTZW9vr7v+ha8Qurm5GSSVXIzb2NiQlO7KSV76/v77740Potm6urpgTBDpyJEjsuwuWFtbGxgYwE+YWGHUQcpbt25pdQI5o6tAeMwz8CAsAI5GYBN3LfFngY6OjtT9/7LohgSYNHjnybmBAfNqICCPpbjan/9AQzIkRp/v7+/HzL3CxRP3xRf8weTw2dfX5/1H7sGDB4FZdvIFHZre3dJaYIkprxIsplKMviEAMoTz4fEjut7w8DA4CAmgRle8sPxR9eaib48WwjWN6idvy1ZlUQHBctF3aj819rvq6bvAC5Ykn4oJqudCEMRuBrzOvK9b9zDyeku7Quby9I3hCw4CRsvUpTGCIHYnbt686XqRpO+/In3rzOLo0aN5j30gCGKn0N3dDceLehCElzi2bwFke+k7KndLSwumYGfPng38+Y0gCIL43PRNEARBkL4JgiAI0jdBEATpmyAIgiB9EwRBEKRvgrBhbm6ur6/vwIEDch702bNnk6FhCIL0TRC7C3LmjP7lWq8vXLhA5RCkb4LYpZBzLeTIMDmr6NOnT3C95Z/ABcIUEATpmyA+ByQCepKmP378KAzuHfNEEHuKvr1/xkv0HL0zNzfX3d1dV1eHaenhw4f1aNb0HBNBDFpbW+X8cg3cc/Hixf3799fX14+MjKytrdW2TjrW03tdLC0t4b4EPs4KZDMzM6PiNTU1oRuLC5ZDC9mCKaKlIP3o6GhjYyNyOHHihBeaJPBr9HizsGCbm5vwOtva2kSwiYkJPdk8mn+06b0j8eTM/vHxcbeIqGbKCGDBixcvIEBqKJmHDx8iK2jeIomc3tfc3IyK4DOpySTCjR4uLlqiRfkFZP7hhx8w4LlLTHlbPFqvcBFRow3nH9Z5tOg9Tt/Ly8saQ6/mxP10oUeVR+lbPCOXjEBAbladnZ1yUorEwkBxbm4//fSThp5LbU45z94DyK4AfWcJZikFxqc11WOX9eTP8K9R+g4IVvszrJ+LU6dOuQns7Ok1feDZwcFBo2ZKClASoAlkBR88KknqYdCeJpPefaBZoxWPlhhVfgGZJQxCgTilWmi0XtEiokYbeDysc0vRe5y+JycndeyqbYXRkaMEoTjoVyIxG8PWPXv2DNe6AUDDP8sdDJsSuEfCYYijdObMGTe33t5e3Hz58mUt4/Asia1z7969P7YgATXgpRag7yzBLKVcv35dAmzCkuAsS7zN4eFhy69ZI59FMIktAh9Eovwg/56eHtxJnpWcVVCg6WtpYVDk0Gc1AIv+ywhQxKYTSJprVowYjSqVVHUS0Wa1xPoJlBhVfgGZJb4MJM86yz5aaLRe0SIsRptVUFjn0aL3OH2jB2IKJkGDUuOMzM7Oivos9H1iC95PbiNJrDk0nmTe0tIC50tnwXCd0Jll5aSWJ/JDsZjfWYJZSoHv4A5Uv/32mxuTMPxrtFcEBBMvRgN/AB8+fHDDZdnZM7XpvWeRZnp6GneOHTtm138ZASqh79Q4it5NaSM3EKLUNBChMdqs4YpHS4wqv4DMMjoGtGFp8XC9okVYjDbcTFk6jxa9x+n7/v37uFhYWMhqIeEOV/WpyhJHDNpMxr3UIMK1RND6q1ev4uvly5flKxpJV07CzYBSIPmlS5dkrpC3taKCRUuxRASPnqabpfOAYLhIZStXciN7pjZ9aubnzp3zTpcM67+MACUhAW2TR2ZWEh892qyWOPeBEqPKLyDz6dOnpYu5LZi3xcP1ihZhMdpwM2XpPFr0HqdvjNvHjx9PrbNMkyUWn0vKWb4P0nvhjLP8IHXWVlZWcN3Y2CgWOTo6Kv058DgeUcoovNRlESxciqzYZuUf/tXYK1IF05XiZLipvOyZ2vSpmcPZefXqlV3/ZQQoiZcvX6ZOFpNFpLZReCYXbdZwxaMlRpVfQObFxUVZYMm19u0WGq1XtAiL0eZqJnvt9jJ9o4XweefOnVp2kFZ5OdDZ2Rk2WfTqkydP1tfXJ7dYJJ0Fd9SVjQcSu7K9vd0N+pkqkix+oX+OjY1htED7FabvgGDRUrbV+w4IJjkHgsAa2TOr6ZMroVNTU7iDxrXrv4wAFsBOkD41Sp/ER9fA7V+i9x1QfgGZgfX1dfinxo1AyUItfka4CIvRFvO+o0XvZfoeGRmB5yuqCdQ5dTaa1Pj79+9l15EXDNR1ydFdvbj1L168kFWwJ0+eeIGPA68udXkBfbgwfQcEi5YCtxFfIbN8xdzNXZIL/xrtFQHBZOPB9PR0uHaycTPAnllNn+X+qwFY9F9GAAuEozHB9+6/e/dO5ukwqqiqZeOTu44srxkC68jRZg1XPFpiVPkFZK5t7eUFCWLMe/v2bXTtO7XLh+sVLcJitFnCRHUeLnov0zdaSHcEap3Ftbl27RpYGL1LukpLS4tF45JYA2DKT/qi/OnTpzLT8dZYMBmHccBzx0/JpfNU+p6dnZWWg2CSLLr7NSlzQLBoKbJ/DpJj0MLN8+fP4+ulS5csv0bpOyCY7D3ATQluDRq9cuWK+xYIJSaH22R3TW36VF9Mpl86K4pqpqQAFqytrYlaRkdHNzY2alsvvUFk0FsyMnpWEaLJpqYmUTUYX7Yx3LhxI6vccLNGKx4tMar8AjJDM5gqoX/Jro8CLR6tV7SIqNEGmims82jRe5m+UW19J6l1vn37dnImEvjnjqsstD1aHS0tGzPlJxk/Fa7rLfjxxx/lp9bW1uhCMObFqUtdjx49srdfVLBoKbAk2I37E3xJWJjl1yh9BwRL3fkLl1NWEvSOuwaV2l1Tm76WvQNXCSKsmfICGLvf3NycONo68AuOHTvm/cspK89UTcKNDczxA81qqXi0xKjyC8gsh8NMTU2FmyOrUEu9okWEjTbcTOGuFC16L9O3G3ba+1tjV1cXWBh948iRI7IwbZzvyKZR8YB0WRxfkVVzczMUnVzGggMlKd2Vk6xmQOccGBiAbPv27QPNQdRbt255PpeRvgOCWUrB48PDw+AO5AA/wvujdvjXMH2HNSb/u8MkCQnQB/r7+zVzzCJxEz+Jm+NOWdR7Cjd98uUSDMDdyBjWTHkB7N0PLsLIyAg8bpSIcsFicDKyFklT84QmYXLIAXWB64BZo7usnIqsZrVUPFpiVPl5ZYZPCqk6Ojo8tdhbPFovSxFho402U5bOjUXvQfr+TIXZ9AgKEDcq9WVUAcAZCb/M2bUNvIctjyCIPUXfcBwwtMoxQ7piXh7wwlznjvRNEATpu2Iy0inb0aNHo9vs7MAMC6MC6ZsgCNJ3QXgLf0m0tLTU1dWdPXvW+1Pfjgu2U9i1ghEE8deib4IgCIL0TRAEQfomCIIgSN8EQRAE6ZsgCIIgfRN2s0hsWFxeXj537pz885YyEzuIhoYGOSINn8kjwv9ScpK+iTgV/vHHH99+++0uP3vzS5SZKIChoSEJ4TIxMZE8CvgvJSfNmohToRwiJse8UWZiZyGxBPbt2xf9O96el5P0TcSpUI4xcCNvUGaC2HmbTzX95J2ZmRmMIXV1dRhMmpqaxsbG1tfX9de5uTn99fDhw+5xsu7pZV999ZUEcBgfH3fP4w5nbo9TXvszWI97Z3Nzc2pqCoVK5pjIuEXrsWruf/RxrYeOhsni06dPFy9eRKWQfmRkxDubVI5Va25uRv74LFx0Gf1EH49SoQTQkDBm9upH2wWJR0dHGxsb8fiJEyc8nt0RmY2qTo3kEm0Fix2Wkc0+whkDpOW1wEAfz9WFA80aNSpjfcu3haVr2+XcXvqWI9I9oG7y6/Pnz5O/ekfvJzE4OGjJPFfbLy8vaxg9TSxhrV2cOnVKGTP1fHAJ9GOxDLSrm3NnZ6fmnHqocYGiS+on+ni0z5w7dw7Xd+/ezVX9cLvA1js6OrzjnuVQ+B2U2ajqYvRtscMysm0ffRdWi/bx7aDv1M5urG/JtjB2bbuc20vfElHl3r17f2xBgmVgUJJfJVLt5OQk+iR+BRmF4/XJCeCaIJx5rraHDBgM3TvowHKAvUTfAEH09PTgjp5frOFs3Ng3w8PDGjUmbBkNDQ2PHz/GVziPEvAF8ksCqYgGykkmMBZdUj/RxwO1Q3pZQc4KgxKofrhdrl+/LhEy0SIwCQmYibrvrMz2cvPG8zTaYSWy2deXqjKhaB/fDvpOGpWxvuXbwti17XJu++JJUi+p0azRurOzs25s7+R+gOnpaQmDYszc2PbIGbOYCxcuJIdZDeMCfPjwwe3bkhj04Ub2QcN4+WRZhnt2voQZhCnIV4zGXhxCqbgXybBY0Xb92Nsuy22Bm6yhLO3VD7eLKEe6B4AGSg3++ZlltpebFQHdXQcrYIeVyFY5fee1wGQfr5y+U43KWN/ybWHs2nY5q6HvcHjm+fn5+/fvw1UUdzs1nqkA9fQCX3nA3NY7UzCQeVg2vcbjuFhYWHB/lQBaSeg2TPkq/pqMxpLDgwcPLJbhckRqDPhoHHFj0YX1Y2y71Nptbm7+9NNPEPjw4cPeq/No9cPtEo0XviMy28tN3oezhjuLi4upaYx2WIls20TfeS3Q7eOWLqyvglDlvr4+DXJr7+zG+pZvC2PXtsu5vfSNbqBtlkUQOskCDh486GnfA/ysV69eGTM30jeGPnlV5f6qq07JEFDu46Lfa9euyWQHT6HxCliGm7MUHUhgLLqkfoxtF6ideBaeGxitvqVdskrfKZnt5Sbvg3EkDOn6+vrGxsZ//vOfAnZYiWyV03cxC3T7uJ2+XTx8+DCLvlONyljf8m1h7Np2Obd38USWJg8dOjQ2NobxBC5GljTwpyQudWdnZ9a62NTUFO6cPHnSmLll5gVDweedO3e8X2WcDERu1QVT2f8gS/kim3HnSckhOlp0Sf3Y2y5g9xLP250tRqtvaZcs73unZLaXm7z/yy+/BBjKaIeVyFY5fee1wGQfz7V4gvHv8uXLuPPtt9/m6uzG+pZvC2PXtsv5OV5d6mzi9evXUa15gWgDCaKZW9p+ZGSksbFR6MD9VV4QwxeLNvB3330n0TU1UrXFMmDNegft5IaB7+7u9uhDVtCSC2ThokvqJ2/bpeb54cMH2O4333wDv9JY/XC7wCXB9ZMnT/TtvLv2vVMy28tNvT8zM9PW1oamBNNJyPO8dliJbMXo2ztXoKQFRkkgvPYNg1Fn1t7ZjfUt3xbGrm2X83PQ9+zsrKzP6tYI2erY3t4u038MQZB1cnISX5Ema2QW9xyGbsnc2PbIxNuq6L4jBi9IYGyY4JUrV5KvKXCh/gI+X7x4YbQMffuM/OXts7a6FN3U1CQJkCeucefGjRu5ii6pn+jjRruX3WOekgPVD7eL5CZ/iYQk4inrDpydktlebt7hxGiHlciWl77RBC7VFjChaB/PRd8YyycmJgLed5ZRGetbvi2MXdsu5/bS99DQUOrEUDYs3759O/mT/nMna2FLqxrO3Nj28B28l6U6jCd3aMIp0xj2mlj2O6a+fAtYhniRCh2fs4rG+KyzNmPRJfUTfdxo93KECBwi2Z0drX64XdDz4aK6z8JP0X+375TM9nLz0rfRDkvKZowlm7rdQKm2sAUG+rilCyeB2Uyuzm6k7/JtYezadjm3l77X1tYGBgYwmKAnoFZQ661bt/Brb2+vThu7urrkaLcjR46A0LNeayAHJHA35UQzt7S9G0jeSy//j8IUAbKhkfr7+9+8eZNMDNXLGwkksFvGysoK5MSDzc3NcKK9xVwUPT4+jmEcVWttbcW8xF0vMxZdUj/Rx+12//DhQ7XjaPWj7YJnh4eH6+vr8TgcH7dRdkpme7kFFnMsdlhStgL0XVdXh+Iglbii7jYE9ceNFhjo47noGwXBHlK9k6hRGZupZFsYu7ZdzrL0TeRW3F/7HLsvsfpf0HGJxQA/QN+eEX8F2yZ9k75J33tEtps3b7oeH0H6JkjfpO8vQ7ZdfoAq7YT0vVvgLg6y+pSZ5kTbJn0TBEEQpG+CIAjSN0EQBEH6JgiCIEjfBEEQpG+C2G34+PHj5OTk4cOHNWRJOLADsQfQ0NAgJ2Th0zvxnCB977I2MEce+QvCO1ziq6++OnjwoHsqA7H3MDQ0dOXKFVxMTEzgmgohfZO+vzxIsJITJ07Mz8+HQ/MQewkrKysYtjHf4h+RSN/El4rz58+jD6+urlIVBJFJ357Tt7Cw0Nraqie4ywFdzc3N6Ev4xIzGPWU4HAnJ8uynT58uXry4f//++vr6kZGRtbU1V8S8pVuecvH27Vs9XNjF0tIS7re3t+N6bm4OjkBdXR1yO3z4sB6HWzPECZyZmdFnm5qaxsbG1tfX3fSbm5tTU1NtbW2SIJd6c7n2Wc5+eR3maqyweC46OjrOnDmzvLx89uxZmMfXX3/9j3/8w9NeVMioAi36t8scTZ+ruIGBAfdOwA63u6ZhwfSsQXeShGv06NSTF40W4pVCmOgb3cYNlpw83PbUqVPaTgGjMT4LynYTdHZ2aoICpVue8iDhM54/f+7e/Omnn3DzypUruJ8sJXAQezIugQeMVW56CX1dQL3bSt95dWhvLDsVgqfQgcFT3sHKdvOwKNCi/wrp214cxi0NzIivYTvc7poGBHOLds8ff/LkiSdDLgtJlkLE6fvZs2e4fvz4sXyV0BIaewKfEnsC96OGG31WHmloaJDikgmMOXiS2GUWyKnQcPTcm729vbj58uVLidM6OTkJNwF2JtEVklGlU/UgkUru3bv3xxZEMLgkmvju3btCSRJs/t27dz09PbjjHpdcZlncyD4F2i6JAo0VrhR6L/SMTH755Rd8RVvAX8tlHtFCo/qvlr5zFQeT0/02ta1QqAE73O6aBgSrORFqNGQSMDw8rKF5ClhIshQiTt8ntqApMDZ6gd0kjLebJqv5o8/KIy5VSdQ4jRFuzMGTxC6zOgWwM5DF0tKSTjNhOrJy4qWcnZ2VyK2Fu7dGpFaHSKNy1LaCNLqhm0rSt/gvSW+0fNslUaCxLFSIaZBnHpqhRchwoVH9V0vf9uLQZBirLly4kBUyxrPD8kWHTSUsmFz39/e3trbq46BpL5ndQsLVJ1LoW9xDkMv8/Lw7gQ2HVQ5YjzEks0ZBrRUN6pycdBtlVly9ehUJLl++LF8xG5CVk9S1RYwuXhik8OIG9Hn//n04JuJAub+ipqmPJ7e7FrNjzGzw1OLiYl76LqBDY2PZF4K8ILnJDC1Chkktqv+8MofTG4ur/bnrZmFhIRDhzLXD8jUNm0pYMLn+8ccf8SnevSR48OCBm8zenQPVJ9LpWyIVuSGWdUwOu5BZ1hN9NotKNEGxHOwyK1ZWVvBrY2Oj2Nbo6KhYT5JNgIMHD+oIF+6uyFYpO7Xz6+peMuJUJfTd19cn0cLW19c3Njb+85//GOm7gA6NjWWnQiGUMuYRJbWo/qulb2NxMgk+fvx4qvypdli+pmFTCQsm18K2165dk6UPlIihNymDpTsHqk+k07dst6yvr5eVqc/mfScTfH7vW19zy19C2tvbveCtOmmVKNqdnZ2WPoPppMxwx8bGMC7CtfHSi6ga5DTXKrYFv/zyi4V9Pqf3ba+UhIt1MwSz5DKPaKFR/Ve7eGIs7tWrV/i8c+dOLTvermeH5YsOm0pYMJ2+Y2iRlRB4LSCTVBmiFhKtPpG+9v3+/Xs0AJhLVSy7MtzlKm/9MWA90WflEdffR5u5cZ2NOXiS2GV28eLFC1kKlDfm4+PjgT6mB7pbXl3q9P/169deenkRPz09vU30XdvauYgGheODUeSf//ynkb4L6LBAY4UrdfHiRfx69+5dvSPT89OnT9uFlP9qZhUa1X+19G0sbmRkBBNBWYYOFOfaYfmahk0lLJhef/fdd3hc7HxqaspLZrQQY/WJ9NfK8oJbvsrL4qamJnHJwXG4xp0bN25EDTf6rL6wlgRPnz6VN9FK6MYcPEnsMnuAywDjk82qOi2FJy5TQgxpMCnRT0tLi52+Z2dnZTVQX8TrXlcRFbWWUN8g+itXrlT46tI4DBRouyQKNFa4UjIZh3KePXsm7iF6tctB0RLhjngc5xUa1X+19G0sDgInd6aG7bB8TcN1CQjmXoOycSFDBZojVYaohWSVQsTpG8aBERgafPfuXS1jqyZGy+QsLKno6LNyR+bICnW97Tkkp5ZGmT2Icwe4L9Bv376dnFHqPybC3XVoaCh1QqrbY1NFPXDgAPyXYrRbFX0X0GGBxorKPzw87GVoNw+9462DRXciu/qvlr6NxcGH8N6Nh+2wkppa6DtVMPdatjOmvoy1W0hWKUScvoGff/4ZX3t7e+UrXMXx8XH4yPv27QOvYdh3V6/CZh1+VtfcURbarLm5GaO398cQSw5JYYwye9jY2JAMvZUTTCq7urowpEHII0eOuEcmhbvr2trawMAAHoQYGKWQz61bt1zd1v78Hxp8K2QOo+/v73/z5k1h2q2KvovpMG9jWeSHSci2Trjeo6Oj3p8qAyXW1dXhKShW/E331Z/rpYb1X/nfdizFuQHj3cez7LCSmlroO0swvQYRy/tJZJ5V/aiFZJVCpNP3jhW/y9oG3UMG/4BLsquA3hJ+H0sQBOl7j9M3XABMAuDRuOv+ux+YO7uuCkEQpO+/HH3rStzRo0e/oLNJeaImQZC+dwbe2twOoqWlpa6u7uzZs8vLyzQLgiBI3wRBEATpmyAIgiB9EwRBkL4JgiAI0jdBEARRhr6/rD87NTQ0yLFQ+EyelL03SiQIgtiD9D00NCShFSYmJnC9J0skCILYg/QtJ5Xv27fvs/2N5fOXSBAEsQfpmyAI4q9L3+/evTt16tT+/fvb29slXgHw7Nmzjo4O3ISn6QbBq/15ellzczM8UHxOTEy4R8FpGJ2LFy/i8fr6+pGRkbW1NS8BnnX/oY5rOWs7eUJbuCD9KhFzwgNPNPzV5ubm1NRUW1sbSmxqaspVovfrwsJCa2urHqJvyTmqk1wCRBVSLH04JoulrHA+MzMzmNbU1dWJosbGxtbX192sLJrMyhx2ODo62tjYKKFh3NhSta0zqWHzGuO8ZHS0aEcIW7gcDaiHXyc1fPXqVTeIZdgqUoUsfGilHu4qAV7Gx8fdJggo2StxdXUVOmloaJCmvHz5sneoZBLRzMOy5aKUAuJ9bvpG39BIAnJculxIcCMNqqBdKPXcXrC/8o5GzXATdHZ2egnck68BHTbCBwQnC5Lr5eVlDehXhr4lJnexEr2sQATJaN/hnKM6sQtgUUix9NtK39euXUveB/25WRk1mcwcfU8bRU+mlqPtAYlAVmFwy2hHCFu43vn555+TOpSA2slCs6xiO+jbxeDgoPJjQMledAEvpVQ/ULol84BsuSilgHg7QN/SYQ4fPvzhwweMbJBPBQVl46bE25UgpLU/o2ZolBx8SpQc3HdVgCELFhZIgBwuXbqk0gwPD+sokqsguZ6cnFSnKWp8WXfu3r0rR8hLwGyYRU9PD+7cunXLUqJ7jbkLrkUD9pyjOrELYFFImfRZpJxrRS4rFO+9e/f+2ILYAPxWTRDVZCDz69evS/RRPIXOKcFIoWT5VYK/II3lTHm7QgIdIWrhYkXogMnMMQyogRnbsdiR6+FMoCuJEKBnF4eV7D7+73//W2IGSVjw169fw1lObUpjC0Zly0UpBcTbAfpGT4BMcPTk69zcnNRBZyVPnz51Q9IJv7sx66anp5Mx69xKSlA7dDM3AVTvxrWBTi9cuOCqz1iQDKqYB3mPF+hv4tZpsA8Ao1dq9KzUEt3rE1vwHMZozlGdGAUwKqRw+u2j79QH3eDxUU0GMheL0jEVmUgIMfkqrJdLQotCAh0hauGaBr3SzVw6ad6OsB30jRJF5mPHjlmU7D4OFsb1gwcPNLfZ2Vnc6erqyirdnnlANgulFBNvB+hb/B13Qqeho3Wp0R3BjBGjNURvLRFCXhJIcDLxoSSwITRVIDQ1Lu7fv48LyaQMfbsrid4EzVKi6g2DObhAA2bac47qxCKAXSGF00eXRFB9VK2vr0+VkIu+8RREwkREZn5umqgmA5mLRWWdCXz69Gn8evnyZffgyfIKCXSEqIUDL1++hDKhB+SjGeKra2DGdsySNqvJ7Isn586dU6WFlZx81o3Al6y+h7yZp8oWpZTC4u0AfScbFQ2ZDHuqHpCsrAVcpCzT8RKIkcmaDGZ8yFYNNG9BGDyPHz9u8SbC/U0XDT0YS3TfH2jA5Vw5R3ViEcCukMLpc61oP3z40E7fKysrStmpq89RTQYyT7UoxeLiokyl865955qO5OpKAtiS9zbVMzBjO4bpO9lkdoqE3l69emVRclS3qU1pbMFisiW7YWHxdoC+vREp6X17Y45xBEsm8DxN5C/vjmtbUd5PnjzpWZixILQNPu/cuVOevqXEQEDecIkavRN1qa+vd9+JG3OO6sQigF0hxdIb2Wp9fR2eLO58++23dkKR1UzMW8fGxsBQoFQvTVSThb1vV+YK6TvQESzeN6wItgRLWF1ddQ0MaSSau70do4snXpMZ1741wLzdQQ5XP/BPZnvmAdksE/pi4u0AfcurWF1OwmRN6iBTeF3x0eWh7u5ub/1IVvS89SPXO4BJuWHCVUffffedxJbEVyjaU5+xoJGRkcbGRvdlfbhL606+ZIOJKqanp8O2m1WiXr9//142LWnbG3OO6sQigF0hxdLbnU1xBcRbyfXqUhccRA9umqgmA5nDM3Vf82BO7a6cyoIVOm17e/vbt2+rWjwJdISohcN+YEXQCSwqYGDGdrSsfbtNlusdhs7Xw0pOdnC3KWWpMPkaw9iCUdmMlFJYvB2gb3nBCn/nt99++/jx45kzZ6QOvb29Gxsb7969k/et169fd9/eNjU1iXcJF0Be2d+4ccPbRCEJnj59KnNStWPVkY6N+BRXIrnzJFoQ2kb3xoY7G4zebcvkI1IipJWg3SCRK1euJF8wZpXobQBwI2cac47qxCKAXSHF0hvpG11rYmIir/ct9A2PQchUN97oftuoJgOZyyYrTGtgCcjw/Pnz+KpbfeDRoxdg7FTHpRKFBDpC1MI9K8oyMGM7RunbazKjhysbLsESFiW7j9+6dQvXzc3NsrVjfn4e1271k7BnniqbkVIKi7cD9A2OlnesAcAf0f6TuncSw5fOZ+WOjJMK9ThcHT169Cjr3aC9IPQ33YcQ6Gyag7alsUTIprHnwyV6m0bFb5JNqcacozqxCGBUSOH0ede+Z2Zm7IQyNDSUmoluh49qMpA5bNgzdbir4tgC4D6d8VRI34GOELbwpaUl2E9ra6vO4bIMzNiO9rVvaTL7+rJLamElp86lXHR1dQVWxiyZB2QzUkph8XaAvmtbW6/ga2PGBIOQnZLSYfAVNoHpvCpIlTg+Pg63Ao/AvOACJLfKrqysIE88jiELXcJdrlIdQRHyMqG/vz9VfZaC3Gjrgc6GSTHKwjgkXpvr7rn+uPwpC8nkP28Q7M2bN8YSvdJFk1CCPeeoTiwCGBVSOL2RvqFVeMRKu0ZCWVtbGxgYwLNocRAfeEScIFVjVJPhusAsh4eH6+vr8SzE0wfhceNOR0eHt65aXiGBjhC2cDzl/mcnYGDGdozSt9dkFvqG2EeOHPG2QmcpOdzB8YlreJNh2opmHpbNQillxNsB+rbYfY58eWQKQbAjEKRvgiB9EwTpmyBI38Sepm9vOTgvSj5OEHsD7AjEDtA3QRAEQfomCIIgSN8EQRAE6ZsgCIL0TRAEQZC+iZ01i9jBA1QRQZC+CdI3QRCkb4L0TRCkb4L0TfomiN1O33Jmmx4TnOyiV69edaML6v2BgQH3ztzcXHd3d11d3b59+w4fPnzz5s1An7fHt01FoCxgZmZGf21qahobG1tfXw9nKCfYNTc34xF8TkxM6Om4nsxZQVjCyskbIjaroPJyVkvfYVWHmylcF1d4mKiEJhgfH9c0FoVn6WFzc3NqagoZitipavSwsLBw4sQJpG9oaBgZGVldXQ0rPFeTeVhbWxsdHW1sbJS4S27Mpmhx5RVbTGZiZ+hb21LPpXSt4fHjx6lWsry8rCEH8fX58+dJewqcHF+GvsNlyWnuHi5evBjIMPUI4FOnTqUeHGqhb085VdF3JXJWSN9hVYebKVqXLJIaHBy0KzxLDxKrPqxGF0tLS2BtN/3Ro0e9M7jLNJk3qnV0dHhHmcuR8ZaqlVdsAZmJnVw8efbsmVhksmN0dnZqHDUv0ofGTq1tRWWUwB8wPjSzBBxIDR9Xnr7DZUmslnv37v2xBQmuUV9fH8hQ0mhIFHxKSBTc1zTw17wIhAH69pRTmL63Q047fQdgUXW4maJ1SYZNkbOtU40qqfBA9e/evSsn9EtIHTBjT08P7ninQrsYHh5GgvPnz0OMlZUVCUifDLmSLMvSZB6uX78uoa8gGIqTyJ8QwDiXLa/YAjITO7z2jdEVLYTZrtvA+JoaBQ69EVOqCxcupHYY/CqxMWGC27R4EigrlYzCkaGl7m74u+npabfitT9D6qHWUfpOVU4l9F2JnBXSt13VyWaK1sUrCDlIgmPHjuWyxuRNcb01Kk1tK1ZJOICh8JdGLMGzxthsliZLbWUNPCtludE4w7ZUXrEFZCZ2mL5fvnyJjgeP6ffff5cGxgW+4ub8/LzX8Pfv38fFwsJCIHgHPBovblMWC3jRMTBV7Ovr00ItLOOWJcDjEPLSpUviA4b5yxLtW5zHc+fORek7VTkFeDD5ayVyVrv2bVF1ajMZA357QL0wPtmtMVVg90WOt0aRa2BLTumyAtuHmyy1lQMrFWH6Lq/YAjITO0zf0g10BqqRk9wg2WolGIePHz9ey44zCxw8eNDjfQt9u3j48GFY+tSyMLdVHjEu/sqyadiRxEwZd65cuRKl71TlVELflchZIX0bVZ3aTNG6pKoLTuirV6/s1ph6U1fJk4G1ctE38jGWlWs6mPqInb7LK7aAzMQO0/d///tfeBMnT55cXV3VAH34iiFXgp1rw6OZ8Xnnzp2sDgPHQaI7d3Z2Flg8WV9fv3z5cjjWdaAsWSvEJH1sbAxjz+LiYiXe95kzZ3RxKUDfWcqpZPGkEjkrpG+7qpPNZHQS3V+npqZwBzaZyxqzPOIy0WZF1ORB3l+Q9x1QLL3vL4y+NWS1rO5pA+Or7CuStpT7IyMjjY2NYl7hfq72nXftG5nnGu3dssTX+/333+Xr69evo/zV3d3tLfbh2l3sgx7gknjDSSp9ZymnEvquRM4K6Tuvqt1mitYli4s9o4paY/KmbKuYnp62K6SpqQmPfPjwQb4+efIEX48cORItK1rNJCQsPYpwX2Z4a9+e4++WW16xBWQmdpK+JycnZZNAsoHdn3RFJbkjsL29HRfXrl0D0aMvyVMtLS0F6Bv2OjExEfC+w2UJp8zOzta29urivuQf2Lgqr9rRReVVO2Yb0l11a4G8FpM8w/SdqpxapTtPSspZOX1nqTrcTNG6JJ1E8d/hTFgUHqiLFA1CfPr0Kb5i+Lly5Ur41eXf//532XmCqsE+ZTuWu0IVLitQzSRkO+bRo0cxGKM4FIqvly5d0hE66fgnd56UUWwBmYkdo++lpSVYQ2trq7eP1XPM3717p0t+3jtJXNy+fTu5oKZ/07DQdxIzMzOpQofLGhoaSs3t0aNHgRWY5EZX+Boyv/6bAZosVTlV0XclcloI3UjfYVWHmylcl0B1PBrKUnigLqlFHzhwALOHLIXA75bNJ+5isfvPnVxludVMApR96NAhNz2mF+602KXaZLnlFWuRmX++3S303dvb6/5nJ9k2si1UkgHff/99akqwbVdXF4gePQrzSvRe42qdZyjIAX5QgG3DZa2trQ0MDOCnffv2YR6KlLdu3RL5Axmiz4yPj3/zzTd4CiMZXMXonzJS6TtLOZXQdyVyVkjfUVUHmilcl2R1kAY5uFuzwwoP35R/FWJ+IH857u/vf/PmTbirLC4unj59Wupy6tSp1PRZZQWqmYqVlZXh4eH6+nqUhb6gZdXV1eEOxJZ5g8KLqFlSsRaZSd+7aPGEKMZlu8qOvxQ5CYIgfZMWSd8EQfomsuHNTHP9SjkJgiB9EwRBEKRvgiAI0jdBEARB+iYIgiBI3wRBEKRvgiAIgvRNEARBkL4JgiBI3wRBEATpmyAIgiB9EwRBEKRvgiAI0jdBEARB+iYIgiBI3wRBEKRvgiAIgvRNEARBkL4JgiBI3wRBEATpmyAIgiB9EwRBEKRvgiAI0jdBEARB+iYIgiBI3wRBEKRvgiAIgvRNEARBkL4JgiBI3wRBEATpmyAIgiB9EwRBEKRvgiAI0jdBEARB+iYIgiBI3wRBEKRvgiAIgvRNEARBkL4JgiBI31QBQRAE6ZsgCIIgfRMEQRCkb4IgCNI3QRAEQfomCIIgSN8EQRCkb4IgCIL0TRAEQZC+CYIgCNI3QRAE6ZsgCIIgfRMEQRCkb4IgCNI3QRAEQfomCIIgSN8EQRCkb4IgCIL0TRAEQZC+CYIgCNI3QRAE6ZsgCIIgfRMEQRCkb4IgCNI3QRAEQfomCIIgSN8EQRCkb4IgCIL0TRAEQZC+CYIgCNI3QRAE6ZsgCIIgfRMEQRCkb4IgCNI3QRAEQfomCIIgSN8EQRB/Tfwf9nLafm1nx1QAAAAASUVORK5CYII="/>'
            + '</div>'
            + '<div class="simple-quiz-shell-main-game">'
            + '<div class="simple-quiz-shell-timer"><p class="simple-quiz-shell-timer-time" id="timeLeft">0:00</p>'
            + '</div>'
            + '<div class="simple-quiz-shell-input"><div class="simple-quiz-shell-input-content">'
            + '<input id="answer" type="text" pattern="[А-Яа-я0-9]*" placeholder="Слово или цифра" required>'
            + '<input id="send" type="button" value="Ответить"></div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div id="login" class="simple-quiz-shell-login simple-quiz-shell-hidden">'
            + '<h2>Добро пожаловать на онлайн викторину!</h2>'
            + '<form id="login" class="form-signin">'
            + '<h7>Введите ваш рабочий e-mail</h7>'
            + '<input id="email" type="email" id="inputEmail"'
            + '    placeholder="Ваша рабочая почта" required autofocus>'
            + '<input id="start" type="submit" value="Начать игру!">'
            + '<span id="loginError" class="simple-quiz-shell-hidden">Что-то пошло не так!</span>'
            + '</form>'
            + '</div>'
            + '<div class="simple-quiz-shell-foot simple-quiz-shell-hidden"></div>'
            + '<div class="simple-quiz-shell-welcome simple-quiz-shell-hidden"><div><h3>Добро пожаловать на онлайн викторину!</h3>'
            + '<p id="rules"></p>'
            + '<p>На каждый вопрос дана одна минута.</p>'
            + '<input id="welcomeStart" type="submit" value="Получить первый вопрос"></div>'
            + '</div>'
            + '<div class="simple-quiz-shell-gameover simple-quiz-shell-hidden"><div>'
            + '<h1>Спасибо, <span id="finishName">Тестовый игрок</span>!</h1>'
            + '<h1>Вы набрали <span id="points">-1</span> баллов.</h1></div>'
            + '  <p>Награждение победителей состоится 26 декабря.<p></div>'
            + '<div class="simple-quiz-shell-info simple-quiz-shell-hidden">'
            + '<div><h3 id="info">Ответ принят</h3>'
            + '<input id="next" type="button" value="Следующий вопрос">'
            + '</div></div>'
            + '<div class="simple-quiz-shell-error simple-quiz-shell-hidden"></div>'
        },
        stateMap = {
            $container: null,
        },
        jqueryMap = {},
        setJqueryMap, initModule, initLogin, initWelcome, initHeader, initMain, initInfo, initGameOver;
//----------------- END MODULE SCOPE VARIABLES ---------------
//-------------------- BEGIN UTILITY METHODS -----------------
//--------------------- END UTILITY METHODS ------------------
//--------------------- BEGIN DOM METHODS --------------------
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $login: $container.find('.simple-quiz-shell-login'),
            $welcome: $container.find('.simple-quiz-shell-welcome'),
            $header: $container.find('.simple-quiz-shell-head'),
            $main: $container.find('.simple-quiz-shell-main'),
            $info: $container.find('.simple-quiz-shell-info'),
            $gameover: $container.find('.simple-quiz-shell-gameover'),
        };
    };
    //login
    initLogin = function () {
        var game = simpleQuiz.model.game;
        var inputVal = function () {
            return jqueryMap.$login.find('#email').val()
        };
        var loginError = jqueryMap.$login.find('#loginError');
        if (!game.isLoggedIn) {
            jqueryMap.$login.removeClass('simple-quiz-shell-hidden');
        }
        jqueryMap.$login.find('#start').click(function (event) {
            event.preventDefault();
            game.login(inputVal())
        });
        game.addEventListener(simpleQuiz.model.events.LOGIN_SUCCESS, function () {
            game.checkStatus();
            jqueryMap.$login.addClass('simple-quiz-shell-hidden');
        });
        game.addEventListener(simpleQuiz.model.events.LOGIN_FAILURE, function () {
            loginError.text(game.error);
            loginError.removeClass('simple-quiz-shell-hidden');
        });
    };
    //
    //welcome
    initWelcome = function () {
        var game = simpleQuiz.model.game;
        game.addEventListener(simpleQuiz.model.events.CHECK_STATUS_SUCCESS, function () {
            if (game.isLoggedIn) {
                if (game.playerState == simpleQuiz.model.playerState.BEFORE_GAME) {
                    jqueryMap.$welcome.removeClass('simple-quiz-shell-hidden');
                }
            }
        });
        jqueryMap.$welcome.find('#welcomeStart').click(function (event) {
            event.preventDefault();
            game.nextQuestion();
            jqueryMap.$welcome.addClass('simple-quiz-shell-hidden');
        });
    };
    //header
    initHeader = function () {
        var game = simpleQuiz.model.game;
        var updateUI = function () {
            if (game.isLoggedIn) {
                if ((game.playerState != simpleQuiz.model.playerState.BEFORE_GAME) &&
                    (game.playerState != simpleQuiz.model.playerState.GAME_OVER)
                ) {
                    jqueryMap.$header.find('#player').text(game.playerName);
                    jqueryMap.$header.removeClass('simple-quiz-shell-hidden');
                }
            }
        };
        game.addEventListener(simpleQuiz.model.events.NEXT_QUESTION_SUCCESS, function () {
            updateUI();
        });
        game.addEventListener(simpleQuiz.model.events.CHECK_STATUS_SUCCESS, function () {
            updateUI();
        });
        game.addEventListener(simpleQuiz.model.events.ACTION_PERFORMED, function () {
            if (game.isLoggedIn) {
                if (game.playerState == simpleQuiz.model.playerState.GAME_OVER) {
                    jqueryMap.$header.addClass('simple-quiz-shell-hidden');
                }
            }
        });
    };
    //
    //main
    initMain = function () {
        var game = simpleQuiz.model.game;
        var answer = jqueryMap.$main.find('#answer');
        var send = jqueryMap.$main.find('#send');
        //
        $(document).ready(function(){
                         var rules = document.getElementById('rules');
                         rules.innerHTML = $.ajax({
                            type: "GET",
                            url: "rest/admin/rules",
                            async: false,
                            }).responseText;
        });
        //

        var updateUI = function () {
            //todo: it's better to cache all this found elements
            jqueryMap.$main.find('#question').attr('src', 'data:image/png;base64,' + game.question);
            jqueryMap.$main.find('#questionNumber').text(10 - game.questionsLeft /*magical*/);
            jqueryMap.$main.removeClass('simple-quiz-shell-hidden');
        };
        var disableAnswer = function () {
            send.prop('disabled', true);
            answer.prop('disabled', true);
        };
        var enableAnswer = function () {
            send.prop('disabled', false);
            answer.prop('disabled', false);
        };
        var getAnswer = function () {
            return answer.val();
        };
        var clearAnswer = function () {
            return answer.val("");
        }
        send.click(function (event) {
            var answerStr = getAnswer();
            if (!answerStr) {
                answer.focus();
            } else {
                event.preventDefault();
                game.answerQuestion(answerStr);
            }
        });
        game.addEventListener(simpleQuiz.model.events.CHECK_STATUS_SUCCESS, function () {
            if (game.playerState == simpleQuiz.model.playerState.BETWEEN_QUESTIONS) {
                disableAnswer();
                clearAnswer();
            }
            else if (game.playerState == simpleQuiz.model.playerState.IN_GAME) {
                enableAnswer();
            }
            if ((game.playerState != simpleQuiz.model.playerState.BEFORE_GAME) &&
                (game.playerState != simpleQuiz.model.playerState.GAME_OVER)
            ) {
                updateUI();
            }
        });
        game.addEventListener(simpleQuiz.model.events.NEXT_QUESTION_SUCCESS, function () {
            updateUI();
            enableAnswer();
        });
        game.addEventListener(simpleQuiz.model.events.ACTION_PERFORMED, function () {
            if (game.playerState == simpleQuiz.model.playerState.GAME_OVER) {
                jqueryMap.$main.addClass('simple-quiz-shell-hidden');
            }
        });
        game.addEventListener(simpleQuiz.model.events.ANSWER_QUESTION_SUCCESS, function () {
            if (game.playerState == simpleQuiz.model.playerState.BETWEEN_QUESTIONS) {
                disableAnswer();
                clearAnswer();
            }
        });
        game.addEventListener(simpleQuiz.model.events.ANSWER_QUESTION_FAILURE, function () {
            if (game.errorCode == 'TIMEOUT_EXPIRED' || game.errorCode == 'EMPTY_ANSWER_PROVIDED') {
                disableAnswer();
                clearAnswer();
            } else {
                game.checkStatus();
            }

        });
        //timer
        var convertMillisToMinSec = function (millis) {
            var minutes = parseInt(millis / 1000 / 60);
            var millisLeft = millis - minutes * 1000 * 60
            var seconds = parseInt(millisLeft / 1000);
            //assume minutes aren't greater than 9
            return '0' + minutes + ":" + (seconds > 9 ? seconds : '0' + seconds);
        }

        var timer = jqueryMap.$main.find('#timeLeft');
        var stopper;
        var updateTimer = function () {
            var update = function update() {
                var time = timer.text();
                var ss = time.split(":");
                var dt = new Date();
                dt.setHours(0);
                dt.setMinutes(ss[0]);
                dt.setSeconds(ss[1]);
                if (ss[0] == 0 && ss[1] == 0) {
                    game.answerQuestion(getAnswer())
                    return;
                }
                var dt2 = new Date(dt.valueOf() - 1000);
                var temp = dt2.toTimeString().split(" ");
                var ts = temp[0].split(":");
                timer.text(ts[1] + ":" + ts[2]);
                if (!(ts[1] == 0 && ts[2] == 0)) {
                    stopper = setTimeout(update, 1000);
                } else {
                    game.answerQuestion(getAnswer())
                }
            }
            stopper = setTimeout(update, 1000);
        }
        game.addEventListener(simpleQuiz.model.events.CHECK_STATUS_SUCCESS, function () {
            if (game.playerState == simpleQuiz.model.playerState.IN_GAME) {
                timer.text(convertMillisToMinSec(game.timeLeft));
                updateTimer();
            }
        });
        game.addEventListener(simpleQuiz.model.events.NEXT_QUESTION_SUCCESS, function () {
            timer.text(convertMillisToMinSec(game.timeLeft));
            updateTimer();
        });
        game.addEventListener(simpleQuiz.model.events.ANSWER_QUESTION_SUCCESS, function () {
            clearTimeout(stopper);
        });
        //
    };

    //info
    initInfo = function () {
        var game = simpleQuiz.model.game;
        var infoText = jqueryMap.$info.find('#info');
        jqueryMap.$info.find('#next').click(function (event) {
            event.preventDefault();
            game.nextQuestion();
            jqueryMap.$info.addClass('simple-quiz-shell-hidden');
        });
        game.addEventListener(simpleQuiz.model.events.CHECK_STATUS_SUCCESS, function () {
            if (game.playerState == simpleQuiz.model.playerState.BETWEEN_QUESTIONS) {
                infoText.text('Продолжим?');
                jqueryMap.$info.removeClass('simple-quiz-shell-hidden');
            }
        });
        game.addEventListener(simpleQuiz.model.events.ANSWER_QUESTION_SUCCESS, function () {
            jqueryMap.$info.removeClass('simple-quiz-shell-hidden');
            infoText.text('Ответ принят.');
        });
        game.addEventListener(simpleQuiz.model.events.ANSWER_QUESTION_FAILURE, function () {
            jqueryMap.$info.removeClass('simple-quiz-shell-hidden');
            infoText.text('Увы, время на ответ истекло!');
        });
        game.addEventListener(simpleQuiz.model.events.ACTION_PERFORMED, function () {
            if (game.playerState == simpleQuiz.model.playerState.GAME_OVER) {
                jqueryMap.$info.addClass('simple-quiz-shell-hidden');
            }
        });
    };

    //gameOver
    initGameOver = function () {
        var game = simpleQuiz.model.game;
        game.addEventListener(simpleQuiz.model.events.ACTION_PERFORMED, function () {
            if (game.playerState == simpleQuiz.model.playerState.GAME_OVER) {
                jqueryMap.$gameover.find('#finishName').text(game.playerName);
                jqueryMap.$gameover.find('#points').text(game.points);
                jqueryMap.$gameover.removeClass('simple-quiz-shell-hidden');
            }
        });
    }


// Begin Public method /initModule/
    initModule = function ($container) {
        // load HTML and map jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
        initLogin();
        initWelcome();
        initHeader();
        initMain();
        initInfo();
        initGameOver();
        (function () {
            simpleQuiz.model.game.addEventListener(simpleQuiz.model.events.ACTION_PERFORMED, function (arg) {
                console.log(arg)
            });
            //actualize current game state
            if (simpleQuiz.model.game.isLoggedIn) {
                simpleQuiz.model.game.checkStatus();
            }
        })();
    };
    // test
    //...
// End PUBLIC method /initModule/
    return {initModule: initModule};
//------------------- END PUBLIC METHODS ---------------------
}());