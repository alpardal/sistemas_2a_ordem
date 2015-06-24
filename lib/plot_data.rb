class PlotData

  def initialize(wn:, xi:)
    @wn = wn
    @xi = xi
  end

  def data
    b = 2*@xi*@wn
    c = @wn*@wn
    time = '[' + 0.step(10, 0.1).to_a.join(',') + ']'
    code = "pkg load control;[y, t, x] = step(tf([#{c}], [1, #{b}, #{c}]), #{time})"
    lines = `octave --silent --eval "#{code}"`.split("\n")
    lines =  lines.drop_while {|l| l !~ /^y =/}
                  .take_while {|l| l !~ /^x =/}
                  .reject(&:empty?)

    ys = lines.drop(1).take_while {|l| l =~ /\d+/ }.map(&:to_f)
    ts = lines.drop_while {|l| l !~ /^t =/} .drop(1).map(&:to_f)

    {ys: ys, ts: ts}
  end
end
