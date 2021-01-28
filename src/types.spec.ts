import type { ModuleState } from './types';
import { check, checks } from './test-utils';


{
  const store = undefined;

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {};

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {},
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    modules: {},
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {},
    modules: {},
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {
      a: 'a',
    },
  };

  interface Expected {
    a: string;
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    modules: {
      a: {
        state: {
          b: 'a.b',
        },
      },
    },
  };

  interface Expected {
    a: {
      b: string;
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    modules: {
      a: {
        state: {},
      },
    },
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    modules: {
      a: {
        state: {},
      },
      b: {
        state: {
          name: 'name',
        },
      },
    },
  };

  interface Expected {
    b: {
      name: string;
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    state: {},
    modules: {
      c: {
        modules: {
          d: {
            modules: {
              e: {
                modules: {
                  f: {
                    state: {},
                    modules: {
                      g: {},
                    },
                  },
                },
              },
            },
            state: {},
          },
        },
      },
      a: {
        modules: {
          b: {
            modules: {
              c: {
                state: {},
                modules: {
                  d: {
                    modules: {
                      e: {
                        modules: {
                          f: {
                            state: {},
                            modules: {
                              c: {
                                modules: {
                                  d: {
                                    modules: {
                                      e: {
                                        modules: {
                                          f: {
                                            state: {},
                                            modules: {
                                              g: {
                                                modules: {
                                                  c: {
                                                    modules: {
                                                      d: {
                                                        modules: {
                                                          e: {
                                                            modules: {
                                                              f: {
                                                                state: {},
                                                                modules: {
                                                                  g: {},
                                                                },
                                                              },
                                                            },
                                                          },
                                                        },
                                                        state: {},
                                                      },
                                                    },
                                                  },
                                                  a: {
                                                    modules: {
                                                      b: {
                                                        modules: {
                                                          c: {
                                                            state: {},
                                                            modules: {
                                                              d: {
                                                                modules: {
                                                                  e: {
                                                                    modules: {
                                                                      f: {
                                                                        state: {},
                                                                        modules: {
                                                                          state: {},
                                                                          modules: {
                                                                            c: {
                                                                              modules: {
                                                                                d: {
                                                                                  modules: {
                                                                                    e: {
                                                                                      modules: {
                                                                                        f: {
                                                                                          state: {},
                                                                                          modules: {
                                                                                            g: {},
                                                                                          },
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                  },
                                                                                  state: {},
                                                                                },
                                                                              },
                                                                            },
                                                                            a: {
                                                                              modules: {
                                                                                b: {
                                                                                  modules: {
                                                                                    c: {
                                                                                      state: {},
                                                                                      modules: {
                                                                                        d: {
                                                                                          modules: {
                                                                                            e: {
                                                                                              modules: {
                                                                                                f: {
                                                                                                  state: {},
                                                                                                  modules: {
                                                                                                    c: {
                                                                                                      modules: {
                                                                                                        d: {
                                                                                                          modules: {
                                                                                                            e: {
                                                                                                              modules: {
                                                                                                                f: {
                                                                                                                  state: {},
                                                                                                                  modules: {
                                                                                                                    g: {
                                                                                                                      modules: {
                                                                                                                        c: {
                                                                                                                          modules: {
                                                                                                                            d: {
                                                                                                                              modules: {
                                                                                                                                e: {
                                                                                                                                  modules: {
                                                                                                                                    f: {
                                                                                                                                      state: {},
                                                                                                                                      modules: {
                                                                                                                                        g: {},
                                                                                                                                      },
                                                                                                                                    },
                                                                                                                                  },
                                                                                                                                },
                                                                                                                              },
                                                                                                                              state: {},
                                                                                                                            },
                                                                                                                          },
                                                                                                                        },
                                                                                                                        a: {
                                                                                                                          modules: {
                                                                                                                            b: {
                                                                                                                              modules: {
                                                                                                                                c: {
                                                                                                                                  state: {},
                                                                                                                                  modules: {
                                                                                                                                    d: {
                                                                                                                                      modules: {
                                                                                                                                        e: {
                                                                                                                                          modules: {
                                                                                                                                            f: {
                                                                                                                                              state: {},
                                                                                                                                            },
                                                                                                                                          },
                                                                                                                                        },
                                                                                                                                        f: {
                                                                                                                                          state: {},
                                                                                                                                        },
                                                                                                                                        g: {},
                                                                                                                                      },
                                                                                                                                    },
                                                                                                                                  },
                                                                                                                                },
                                                                                                                              },
                                                                                                                            },
                                                                                                                          },
                                                                                                                        },
                                                                                                                      },
                                                                                                                    },
                                                                                                                  },
                                                                                                                },
                                                                                                              },
                                                                                                            },
                                                                                                          },
                                                                                                          state: {},
                                                                                                        },
                                                                                                      },
                                                                                                    },
                                                                                                    a: {
                                                                                                      modules: {
                                                                                                        b: {
                                                                                                          modules: {
                                                                                                            c: {
                                                                                                              state: {},
                                                                                                              modules: {
                                                                                                                d: {
                                                                                                                  modules: {
                                                                                                                    e: {
                                                                                                                      modules: {
                                                                                                                        f: {
                                                                                                                          state: {},
                                                                                                                        },
                                                                                                                      },
                                                                                                                    },
                                                                                                                    f: {
                                                                                                                      state: {},
                                                                                                                    },
                                                                                                                    g: {},
                                                                                                                  },
                                                                                                                },
                                                                                                              },
                                                                                                            },
                                                                                                          },
                                                                                                        },
                                                                                                      },
                                                                                                    },
                                                                                                  },
                                                                                                },
                                                                                              },
                                                                                            },
                                                                                            f: {
                                                                                              state: {},
                                                                                            },
                                                                                            g: {},
                                                                                          },
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                  },
                                                                                },
                                                                              },
                                                                            },
                                                                          },
                                                                        },
                                                                      },
                                                                    },
                                                                  },
                                                                  f: {
                                                                    state: {},
                                                                  },
                                                                  g: {},
                                                                },
                                                              },
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    state: {},
                                  },
                                },
                              },
                              a: {
                                modules: {
                                  b: {
                                    modules: {
                                      c: {
                                        state: {},
                                        modules: {
                                          d: {
                                            modules: {
                                              e: {
                                                modules: {
                                                  f: {
                                                    state: {},
                                                  },
                                                },
                                              },
                                              f: {
                                                state: {},
                                              },
                                              g: {},
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      f: {
                        state: {},
                      },
                      g: {},
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  checks([
    check<ModuleState<typeof store>, never, true>(),
  ]);
}

{
  const store = {
    state: {
      domain: 'ondricka.net',
      user: {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        age: 45,
        someBool: true,
        name: {
          first: 'Darius',
          last: 'Hilpert',
        },
        address: {
          street: 'Meda Cove Suite',
          country: 'USA',
        },
      },
    },
  };

  interface Expected {
    domain: string;
    user: {
      name: {
        first: string;
        last: string;
      };
      age: number;
      someBool: boolean;
      address: {
        street: string;
        country: string;
      };
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    state: {
      a: {
        b: {
          c: 'c',
        },
      },
    },
    modules: {
      m: {
        modules: {
          z: {
            modules: {
              p: {
                state: {
                  l: 'l',
                },
              },
            },
          },
        },
      },
    },
  };

  interface Expected {
    a: {
      b: {
        c: string;
      };
    };
    m: {
      z: {
        p: {
          l: string;
        };
      };
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    state: {
      x: 'Heteronym',
      a: 'Inception',
      b: {
        y: false,
      },
    },
    modules: {
      k: {
        modules: {
          b: {
            modules: {
              c: {
                state: {
                  j: true,
                },
              },
              m: {
                state: {
                  l: true,
                  w: [false],
                },
              },
            },
          },
        },
      },
    },
  };

  interface Expected {
    x: string;
    a: string;
    b: {
      y: boolean;
    };
    k: {
      b: {
        c: {
          j: boolean;
        };
        m: {
          w: boolean[];
          l: boolean;
        };
      };
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    state: {
      x: 'Heteronym',
      a: 'Inception',
      b: {
        y: false,
      },
    },
    modules: {
      k: {
        state: {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          o: 12.5,
        },
        modules: {
          a: {
            state: {
              y: true,
            },
          },
          b: {
            state: {
              k: 'k',
            },
            modules: {
              c: {
                state: {
                  j: true,
                },
              },
              m: {
                state: {
                  l: true,
                  w: [false],
                },
              },
            },
          },
        },
      },
    },
  };

  interface Expected {
    x: string;
    a: string;
    b: {
      y: boolean;
    };
    k: {
      b: {
        c: {
          j: boolean;
        };
        m: {
          w: boolean[];
          l: boolean;
        };
        k: string;
      };
      o: number;
      a: {
        y: boolean;
      };
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}

{
  const store = {
    state: {
      x: 'Heteronym',
      a: 'Inception',
      b: {
        y: false,
      },
    },
    modules: {
      k: {
        state: {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          o: 12.5,
        },
        modules: {
          b: {
            state: {
              e: 'e',
            },
            modules: {
              c: {
                state: {
                  j: true,
                },
              },
              m: {
                state: {
                  l: true,
                  w: [false],
                  y: {
                    m: {
                      n: 'n',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  interface Expected {
    x: string;
    a: string;
    b: {
      y: boolean;
    };
    k: {
      b: {
        e: string;
        c: {
          j: boolean;
        };
        m: {
          w: boolean[];
          l: boolean;
          y: {
            m: {
              n: string;
            };
          };
        };
      };
      o: number;
    };
  }

  checks([
    check<ModuleState<typeof store>, Expected, true>(),
  ]);
}
